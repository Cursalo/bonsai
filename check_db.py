from app import create_app, db
from app.models import User, Skill, PracticeTest, StudentUpload, CustomQuiz, QuizQuestion

app = create_app()

with app.app_context():
    # Check users
    users = User.query.all()
    print(f"Users: {len(users)}")
    for user in users:
        print(f"  User {user.id}: {user.username}, API key: {user.api_key}")
    
    # Check uploads
    uploads = StudentUpload.query.all()
    print(f"\nUploads: {len(uploads)}")
    for upload in uploads:
        print(f"  Upload {upload.id}: User {upload.user_id}, Test {upload.practice_test_id}, Status: {upload.processing_status}")
    
    # Check quizzes
    quizzes = CustomQuiz.query.all()
    print(f"\nQuizzes: {len(quizzes)}")
    for quiz in quizzes:
        print(f"  Quiz {quiz.id}: User {quiz.user_id}, Upload {quiz.student_upload_id}")
        # Check questions
        questions = QuizQuestion.query.filter_by(custom_quiz_id=quiz.id).all()
        print(f"    Questions: {len(questions)}")
        for q in questions:
            skill = Skill.query.get(q.skill_id)
            print(f"      Question {q.id}: Skill '{skill.name}', Correct: {q.correct_option}") 