from app import db
from datetime import datetime
import json
import os # Added os
import secrets # Added secrets

# Association table for UserSkillProgress
user_skill_progress = db.Table('user_skill_progress',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('skill_id', db.Integer, db.ForeignKey('skill.id'), primary_key=True),
    db.Column('status', db.String(64), default='missed'), # e.g., 'missed', 'quiz_correct', 'video_queued', 'video_watched', 'practice_completed', 'mastered'
    db.Column('last_updated', db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True, nullable=False) # Assuming username for now
    api_key = db.Column(db.String(64), index=True, unique=True) # Added API Key
    # email = db.Column(db.String(120), index=True, unique=True) # Optional
    # password_hash = db.Column(db.String(128)) # If login needed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    uploads = db.relationship('StudentUpload', backref='student', lazy='dynamic')
    quizzes = db.relationship('CustomQuiz', backref='student', lazy='dynamic')
    quiz_attempts = db.relationship('QuizAttempt', backref='student', lazy='dynamic')
    video_queue_items = db.relationship('VideoQueue', backref='student', lazy='dynamic')
    practice_attempts = db.relationship('PracticeAttempt', backref='student', lazy='dynamic')
    bonsai_growth = db.relationship('BonsaiGrowth', backref='student', uselist=False) # One-to-one
    skills_progress = db.relationship('Skill', secondary=user_skill_progress, lazy='subquery',
                                      backref=db.backref('users', lazy=True))

    def generate_api_key(self):
        """Generates a unique API key."""
        self.api_key = secrets.token_urlsafe(32) # Generate a 32-byte token

    def __repr__(self):
        return f'<User {self.username}>'

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True, nullable=False)
    category = db.Column(db.String(128), index=True) # e.g., 'Math', 'Reading & Writing'

    # Relationships defined via backref in other models

    def __repr__(self):
        return f'<Skill {self.name}>'

class PracticeTest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    identifier = db.Column(db.String(128), unique=True, nullable=False) # e.g., "Bluebook Test 4"

    uploads = db.relationship('StudentUpload', backref='practice_test', lazy='dynamic')

    def __repr__(self):
        return f'<PracticeTest {self.identifier}>'

class StudentUpload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    practice_test_id = db.Column(db.Integer, db.ForeignKey('practice_test.id'), nullable=False)
    upload_timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    temp_storage_ref = db.Column(db.String(256)) # Path or identifier for temporary file
    processing_status = db.Column(db.String(64), default='pending') # e.g., 'pending', 'processing', 'complete', 'error'
    # Note: Actual file content should not be stored here long-term

    missed_skills_log = db.relationship('MissedSkill', backref='upload', lazy='dynamic')
    custom_quiz = db.relationship('CustomQuiz', backref='upload', uselist=False) # One-to-one

    def __repr__(self):
        return f'<StudentUpload {self.id} by User {self.user_id}>'

class MissedSkill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    student_upload_id = db.Column(db.Integer, db.ForeignKey('student_upload.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    identified_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    skill = db.relationship('Skill')
    user = db.relationship('User')

    def __repr__(self):
        return f'<MissedSkill {self.skill.name} for User {self.user_id} from Upload {self.student_upload_id}>'


class CustomQuiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    student_upload_id = db.Column(db.Integer, db.ForeignKey('student_upload.id'), nullable=False)
    creation_timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    completed_timestamp = db.Column(db.DateTime, nullable=True) # Mark when student finishes

    questions = db.relationship('QuizQuestion', backref='quiz', lazy='dynamic', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<CustomQuiz {self.id} for User {self.user_id}>'

class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    custom_quiz_id = db.Column(db.Integer, db.ForeignKey('custom_quiz.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    options_json = db.Column(db.Text) # Store options as JSON string: {"A": "Option 1", "B": "Option 2"}
    correct_option = db.Column(db.String(16)) # e.g., "A", "B"
    generation_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    skill = db.relationship('Skill')
    attempts = db.relationship('QuizAttempt', backref='question', lazy='dynamic')

    @property
    def options(self):
        return json.loads(self.options_json) if self.options_json else {}

    @options.setter
    def options(self, value):
        self.options_json = json.dumps(value)

    def __repr__(self):
        return f'<QuizQuestion {self.id} for Skill {self.skill.name}>'

class QuizAttempt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quiz_question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'), nullable=False)
    submitted_answer = db.Column(db.String(16)) # The option chosen by the student (e.g., "A")
    is_correct = db.Column(db.Boolean, nullable=False)
    attempt_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<QuizAttempt {self.id} by User {self.user_id} on Question {self.quiz_question_id}>'

class VideoQueue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    quiz_attempt_id = db.Column(db.Integer, db.ForeignKey('quiz_attempt.id')) # Link to the attempt that triggered this
    status = db.Column(db.String(64), default='queued') # e.g., 'queued', 'generating', 'delivered', 'error'
    queue_timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    delivery_timestamp = db.Column(db.DateTime, nullable=True)

    skill = db.relationship('Skill')
    quiz_attempt = db.relationship('QuizAttempt')
    video_lesson = db.relationship('VideoLesson', backref='queue_item', uselist=False) # One-to-one

    def __repr__(self):
        return f'<VideoQueue {self.id} for User {self.user_id}, Skill {self.skill.name}>'

class VideoLesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    video_queue_id = db.Column(db.Integer, db.ForeignKey('video_queue.id'))
    video_ref = db.Column(db.String(256)) # Placeholder: URL, ID, path, etc. Needs clarification.
    generation_timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    watched_timestamp = db.Column(db.DateTime, nullable=True) # Mark when student watches

    skill = db.relationship('Skill')
    practice_questions = db.relationship('PracticeQuestion', backref='video_lesson', lazy='dynamic')

    def __repr__(self):
        return f'<VideoLesson {self.id} for Skill {self.skill.name}>'

class PracticeQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    video_lesson_id = db.Column(db.Integer, db.ForeignKey('video_lesson.id'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    options_json = db.Column(db.Text)
    correct_option = db.Column(db.String(16))
    generation_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    skill = db.relationship('Skill')
    attempts = db.relationship('PracticeAttempt', backref='question', lazy='dynamic')

    @property
    def options(self):
        return json.loads(self.options_json) if self.options_json else {}

    @options.setter
    def options(self, value):
        self.options_json = json.dumps(value)

    def __repr__(self):
        return f'<PracticeQuestion {self.id} for Skill {self.skill.name}>'

class PracticeAttempt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    practice_question_id = db.Column(db.Integer, db.ForeignKey('practice_question.id'), nullable=False)
    submitted_answer = db.Column(db.String(16))
    is_correct = db.Column(db.Boolean, nullable=False)
    attempt_timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<PracticeAttempt {self.id} by User {self.user_id} on Question {self.practice_question_id}>'

# UserSkillProgress is defined as an association table at the top

class BonsaiGrowth(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False) # One-to-one with User
    branch_count = db.Column(db.Integer, default=0)
    last_growth_timestamp = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<BonsaiGrowth User {self.user_id}: {self.branch_count} branches>' 