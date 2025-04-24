# from flask import Blueprint, request, jsonify
# from app import db
# from app.models import User # Example import
# from app.services import analyze_upload # Example import

# bp = Blueprint('main', __name__)

# @bp.route('/upload', methods=['POST'])
# def upload_file():
#     # Handle file upload logic
#     pass

import os
from datetime import datetime # Added datetime
from flask import Blueprint, request, jsonify, current_app, g # Added g
from werkzeug.utils import secure_filename
from app import db
from app.models import ( # Import all needed models
    User, PracticeTest, StudentUpload, CustomQuiz,
    QuizQuestion, QuizAttempt, VideoQueue, Skill,
    user_skill_progress, VideoLesson, PracticeQuestion,
    PracticeAttempt, BonsaiGrowth # Added PracticeAttempt, BonsaiGrowth
)
from app.services import analyze_student_upload, assign_practice_questions # Added assign_practice_questions
from app.auth import require_api_key # Import the decorator

# Use a Blueprint for organization
bp = Blueprint('main', __name__, url_prefix='/api')

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'} # Example extensions, adjust as needed

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@bp.route('/upload', methods=['POST'])
@require_api_key # Protect this route
def upload_file():
    # Use authenticated user from decorator
    user = g.current_user

    # Basic validation: Check if required fields are present
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if 'practice_test_identifier' not in request.form:
        return jsonify({"error": "Missing practice_test_identifier"}), 400

    practice_test_identifier = request.form.get('practice_test_identifier')

    # Validate user and practice test
    practice_test = PracticeTest.query.filter_by(identifier=practice_test_identifier).first()
    if not practice_test:
        return jsonify({"error": f"PracticeTest '{practice_test_identifier}' not found"}), 404

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename) # Sanitize filename
        upload_folder = os.path.join(current_app.instance_path, 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        # Consider unique filenames to avoid overwrites
        temp_file_path = os.path.join(upload_folder, filename)

        try:
            file.save(temp_file_path)
            new_upload = StudentUpload(
                student=user,
                practice_test=practice_test,
                temp_storage_ref=temp_file_path,
                processing_status='uploaded'
            )
            db.session.add(new_upload)
            db.session.commit()

            # --- Trigger Analysis (Ideally Asynchronous) --- #
            # In a real app, use Celery/RQ: trigger_analysis.delay(new_upload.id)
            # For now, call directly (blocks request):
            current_app.logger.info(f"Triggering synchronous analysis for upload {new_upload.id}")
            analyze_student_upload(new_upload.id) # This will now also trigger quiz generation
            # --- End Trigger --- #

            # Fetch the updated upload status after analysis/quiz gen
            db.session.refresh(new_upload)

            return jsonify({
                "message": "File uploaded and processing initiated",
                "upload_id": new_upload.id,
                "filename": filename,
                "status": new_upload.processing_status,
                 "quiz_id": new_upload.custom_quiz.id if new_upload.custom_quiz else None
            }), 201 # 201 Created

        except Exception as e:
            db.session.rollback()
            if os.path.exists(temp_file_path):
                 try: os.remove(temp_file_path)
                 except OSError: pass # Ignore error if file couldn't be removed
            current_app.logger.error(f"Error uploading file or triggering analysis: {e}", exc_info=True)
            return jsonify({"error": "Failed to process upload"}), 500
        # Note: temp file cleanup is handled by analyze_student_upload
    else:
        return jsonify({"error": "File type not allowed"}), 400

@bp.route('/quizzes/<int:quiz_id>', methods=['GET'])
@require_api_key # Protect
def get_quiz(quiz_id):
    quiz = CustomQuiz.query.get_or_404(quiz_id)
    user = g.current_user

    # Authorization check
    if quiz.user_id != user.id:
        return jsonify({"error": "Forbidden: You do not own this quiz"}), 403

    questions_data = []
    for q in quiz.questions:
        questions_data.append({
            "question_id": q.id,
            "skill_id": q.skill_id,
            "skill_name": q.skill.name,
            "text": q.question_text,
            "options": q.options # Use the property that parses JSON
            # DO NOT include q.correct_option here!
        })

    return jsonify({
        "quiz_id": quiz.id,
        "user_id": quiz.user_id,
        "created_at": quiz.creation_timestamp.isoformat(),
        "completed_at": quiz.completed_timestamp.isoformat() if quiz.completed_timestamp else None,
        "questions": questions_data
    })

@bp.route('/quizzes/<int:quiz_id>/submit', methods=['POST'])
@require_api_key # Protect
def submit_quiz(quiz_id):
    quiz = CustomQuiz.query.get_or_404(quiz_id)
    data = request.get_json()
    user = g.current_user # Use authenticated user

    if not data:
        return jsonify({"error": "Missing JSON payload"}), 400

    answers = data.get('answers') # Expected format: {"question_id": "selected_option", ...}

    if not answers or not isinstance(answers, dict):
        return jsonify({"error": "Missing or invalid field: answers (dict)"}), 400

    # Authorization check
    if quiz.user_id != user.id:
        return jsonify({"error": "Forbidden: You do not own this quiz"}), 403

    # Check if quiz already completed
    if quiz.completed_timestamp:
        return jsonify({"error": "Quiz already submitted"}), 400

    results = {'correct': 0, 'incorrect': 0, 'videos_queued': []}
    try:
        for question_id_str, selected_option in answers.items():
            try:
                question_id = int(question_id_str)
            except ValueError:
                # Log this invalid input but potentially continue
                current_app.logger.warning(f"Invalid question ID format '{question_id_str}' in submission for quiz {quiz_id}")
                continue

            question = QuizQuestion.query.filter_by(id=question_id, custom_quiz_id=quiz.id).first()
            if not question:
                # Log this - answer submitted for a non-existent/wrong question
                current_app.logger.warning(f"Answer submitted for invalid question ID {question_id} in quiz {quiz_id}")
                continue # Skip this answer

            is_correct = (str(selected_option) == str(question.correct_option))

            # Create attempt record
            attempt = QuizAttempt(
                user_id=user.id,
                quiz_question_id=question.id,
                submitted_answer=selected_option,
                is_correct=is_correct
            )
            db.session.add(attempt)

            skill_id = question.skill_id
            # Update UserSkillProgress and potentially queue video
            status_to_set = ''
            if is_correct:
                results['correct'] += 1
                status_to_set = 'quiz_correct'
                print(f"Q{question_id} (Skill {skill_id}) Correct.") # Use logging
            else:
                results['incorrect'] += 1
                status_to_set = 'video_queued'
                print(f"Q{question_id} (Skill {skill_id}) Incorrect. Queuing video.") # Use logging
                # Create VideoQueue entry
                video_q_item = VideoQueue(
                    user_id=user.id,
                    skill_id=skill_id,
                    quiz_attempt=attempt # Link attempt
                )
                db.session.add(video_q_item)
                results['videos_queued'].append(skill_id)

            # Update user_skill_progress status for this user and skill
            stmt = user_skill_progress.update().\
                where(user_skill_progress.c.user_id == user.id).\
                where(user_skill_progress.c.skill_id == skill_id).\
                values(status=status_to_set, last_updated=datetime.utcnow())
            db.session.execute(stmt)
            print(f"Updated UserSkillProgress for User {user.id}, Skill {skill_id} to '{status_to_set}'")

        # Mark quiz as completed
        quiz.completed_timestamp = datetime.utcnow()
        db.session.commit()

        return jsonify({
            "message": "Quiz submitted successfully",
            "quiz_id": quiz_id,
            "results": results
        }), 200

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error submitting quiz {quiz_id}: {e}", exc_info=True)
        return jsonify({"error": "Failed to submit quiz results"}), 500

@bp.route('/videos/<int:video_id>/watched', methods=['POST'])
@require_api_key # Protect
def mark_video_watched(video_id):
    """Marks a video lesson as watched and triggers practice question assignment."""
    video_lesson = VideoLesson.query.get_or_404(video_id)
    user = g.current_user # Use authenticated user

    if video_lesson.watched_timestamp:
        return jsonify({"message": "Video already marked as watched"}), 200

    try:
        video_lesson.watched_timestamp = datetime.utcnow()

        # Update UserSkillProgress status
        skill_id = video_lesson.skill_id
        status_to_set = 'video_watched'
        stmt = user_skill_progress.update().\
            where(user_skill_progress.c.user_id == user.id).\
            where(user_skill_progress.c.skill_id == skill_id).\
            values(status=status_to_set, last_updated=datetime.utcnow())
        db.session.execute(stmt)

        db.session.commit()
        print(f"Video {video_id} marked watched for User {user.id}. UserSkillProgress updated to '{status_to_set}'")

        # --- Trigger Practice Question Assignment (Ideally Asynchronous) --- #
        print(f"Triggering practice question assignment for video {video_id}...")
        assign_practice_questions(video_lesson.id)
        # --- End Trigger --- #

        return jsonify({
            "message": "Video marked as watched, practice questions assigned.",
            "video_id": video_id
        }), 200

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error marking video {video_id} watched: {e}", exc_info=True)
        return jsonify({"error": "Failed to process request"}), 500

@bp.route('/videos/<int:video_id>/practice', methods=['GET'])
@require_api_key # Protect
def get_practice_questions(video_id):
    """Fetches the practice questions associated with a video lesson."""
    video_lesson = VideoLesson.query.get_or_404(video_id)
    user = g.current_user # Use authenticated user

    # Authorization check
    queue_item = video_lesson.queue_item
    if not queue_item or queue_item.user_id != user.id:
         return jsonify({"error": "Forbidden: You cannot view these practice questions"}), 403

    questions_data = []
    for q in video_lesson.practice_questions: # Uses the relationship
        questions_data.append({
            "question_id": q.id,
            "skill_id": q.skill_id,
            "skill_name": q.skill.name,
            "text": q.question_text,
            "options": q.options
            # Do not include correct_option
        })

    return jsonify({
        "video_id": video_id,
        "skill_id": video_lesson.skill_id,
        "skill_name": video_lesson.skill.name,
        "questions": questions_data
    })

@bp.route('/videos/<int:video_id>/practice/submit', methods=['POST'])
@require_api_key # Protect
def submit_practice_questions(video_id):
    """Submits answers for practice questions of a video lesson."""
    video_lesson = VideoLesson.query.get_or_404(video_id)
    data = request.get_json()
    user = g.current_user # Use authenticated user

    if not data:
        return jsonify({"error": "Missing JSON payload"}), 400

    answers = data.get('answers') # Expected format: {"question_id": "selected_option", ...}

    if not answers or not isinstance(answers, dict):
        return jsonify({"error": "Missing or invalid field: answers (dict)"}), 400

    # Authorization check
    queue_item = video_lesson.queue_item
    if not queue_item or queue_item.user_id != user.id:
         return jsonify({"error": "Forbidden: You cannot submit practice for this lesson"}), 403

    # Check if practice for this skill/video was already mastered or recently attempted
    # This requires checking UserSkillProgress status
    skill_id = video_lesson.skill_id
    current_progress = db.session.query(user_skill_progress.c.status)\
        .filter_by(user_id=user.id, skill_id=skill_id).first()

    # Prevent re-submission if already mastered (or define specific logic)
    if current_progress and current_progress.status == 'mastered':
         return jsonify({"error": "Practice for this skill already mastered"}), 400
    # Add more checks? E.g., prevent immediate re-attempts after failure?

    # Fetch the specific practice questions associated with this lesson
    practice_questions = video_lesson.practice_questions.all()
    if not practice_questions:
         return jsonify({"error": "No practice questions found for this video lesson"}), 404

    # Basic check: Ensure number of answers matches number of questions (usually 3)
    if len(answers) != len(practice_questions):
         return jsonify({"error": f"Expected {len(practice_questions)} answers, received {len(answers)}"}), 400

    results = {'correct': 0, 'incorrect': 0, 'tree_grew': False}
    all_correct = True
    try:
        for question in practice_questions:
            question_id_str = str(question.id)
            if question_id_str not in answers:
                # Handle missing answer for a specific question
                 return jsonify({"error": f"Missing answer for question ID {question_id_str}"}), 400

            selected_option = answers[question_id_str]
            is_correct = (str(selected_option) == str(question.correct_option))

            # Create attempt record
            attempt = PracticeAttempt(
                user_id=user.id,
                practice_question_id=question.id,
                submitted_answer=selected_option,
                is_correct=is_correct
            )
            db.session.add(attempt)

            if is_correct:
                results['correct'] += 1
            else:
                results['incorrect'] += 1
                all_correct = False

        # Update UserSkillProgress and Bonsai Tree if all answers were correct
        status_to_set = ''
        if all_correct:
            status_to_set = 'mastered' # Or 'practice_completed' etc.
            results['tree_grew'] = True
            print(f"Practice for Skill {skill_id} completed successfully by User {user.id}. Growing tree.")

            # Find or create BonsaiGrowth record
            bonsai = user.bonsai_growth
            if not bonsai:
                bonsai = BonsaiGrowth(student=user, branch_count=0)
                db.session.add(bonsai)
            bonsai.branch_count += 1
            bonsai.last_growth_timestamp = datetime.utcnow()
        else:
            # Decide status if practice failed (e.g., 'practice_failed', keep as 'video_watched'?
            status_to_set = 'practice_failed'
            print(f"Practice for Skill {skill_id} completed with errors by User {user.id}.")

        # Update user_skill_progress status
        stmt = user_skill_progress.update().\
            where(user_skill_progress.c.user_id == user.id).\
            where(user_skill_progress.c.skill_id == skill_id).\
            values(status=status_to_set, last_updated=datetime.utcnow())
        db.session.execute(stmt)
        print(f"Updated UserSkillProgress for User {user.id}, Skill {skill_id} to '{status_to_set}'")

        db.session.commit()

        return jsonify({
            "message": "Practice submitted successfully",
            "video_id": video_id,
            "skill_id": skill_id,
            "results": results
        }), 200

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error submitting practice for video {video_id}: {e}", exc_info=True)
        return jsonify({"error": "Failed to submit practice results"}), 500

@bp.route('/users/<int:user_id>/progress', methods=['GET'])
@require_api_key # Protect
def get_user_progress(user_id):
    """Fetches the skill progress status for a user."""
    requesting_user = g.current_user # User making the request
    target_user = User.query.get_or_404(user_id)

    # Authorization check: Allow users to view their own progress
    # Add admin check later if needed
    if requesting_user.id != target_user.id:
        return jsonify({"error": "Forbidden: You can only view your own progress"}), 403

    progress_data = []
    # Query the association table directly to get status along with skill info
    progress_entries = db.session.query(Skill, user_skill_progress.c.status, user_skill_progress.c.last_updated)\
        .join(user_skill_progress).filter(user_skill_progress.c.user_id == target_user.id).all()

    for skill, status, last_updated in progress_entries:
        progress_data.append({
            "skill_id": skill.id,
            "skill_name": skill.name,
            "category": skill.category,
            "status": status,
            "last_updated": last_updated.isoformat()
        })

    return jsonify({
        "user_id": target_user.id,
        "username": target_user.username,
        "progress": progress_data
    })

@bp.route('/users/<int:user_id>/bonsai', methods=['GET'])
@require_api_key # Protect
def get_bonsai_status(user_id):
    """Fetches the bonsai tree growth status for a user."""
    requesting_user = g.current_user
    target_user = User.query.get_or_404(user_id)

    # Authorization check: Allow users to view their own bonsai
    if requesting_user.id != target_user.id:
        return jsonify({"error": "Forbidden: You can only view your own bonsai status"}), 403

    bonsai = target_user.bonsai_growth # Access via relationship

    if not bonsai:
        # If no record exists yet, return default state
        return jsonify({
            "user_id": target_user.id,
            "branch_count": 0,
            "last_growth_timestamp": None
        })
    else:
        return jsonify({
            "user_id": target_user.id,
            "branch_count": bonsai.branch_count,
            "last_growth_timestamp": bonsai.last_growth_timestamp.isoformat() if bonsai.last_growth_timestamp else None
        })

# Add other routes here 