# Bonsai Prep

Student learning workflow application with AI-powered skill assessment and content generation.

## Overview

Bonsai Prep provides a complete learning workflow to help students master skills they struggle with on standardized tests:

1. Students upload missed questions from practice tests
2. AI analyzes the missed questions and identifies skill gaps
3. Custom quizzes with original questions target each identified skill
4. Incorrect answers trigger AI-generated video lessons
5. After watching videos, students complete practice questions
6. Successfully completing practice grows their virtual bonsai tree

## AI Integration

This application uses OpenAI's GPT-4.1 Mini model to power:

- **Skill Classification:** Analyzes uploaded test results to identify specific skill gaps
- **Question Generation:** Creates original quiz and practice questions for identified skills
- **Video Content:** Generates educational video scripts explaining relevant concepts

## API Endpoints

All endpoints require API key authentication via `Authorization: Bearer <api_key>` header.

### Authentication

- Generated API keys can be viewed when running `flask seed-db`

### Student Upload

- `POST /api/upload` - Upload missed questions from a practice test
  - Form data: `file`, `practice_test_identifier`
  - Triggers AI analysis and quiz generation

### Quiz Workflow

- `GET /api/quizzes/:id` - Get a custom quiz with questions
- `POST /api/quizzes/:id/submit` - Submit quiz answers
  - Body: `{"answers": {"question_id": "selected_option", ...}}`
  - Incorrect answers trigger video generation

### Video & Practice Workflow

- `POST /api/videos/:id/watched` - Mark a video as watched
  - Triggers practice question generation
- `GET /api/videos/:id/practice` - Get practice questions for a video
- `POST /api/videos/:id/practice/submit` - Submit practice answers
  - Body: `{"answers": {"question_id": "selected_option", ...}}`
  - Successful completion grows bonsai tree

### Progress Tracking

- `GET /api/users/:id/progress` - View skill progress
- `GET /api/users/:id/bonsai` - View bonsai tree growth status

## Setup & Installation

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
export FLASK_APP=run.py
flask db upgrade
flask seed-db  # Creates test user and initial data

# Run the application
flask run
```

## Development Notes

- OpenAI API key is configured in `config.py`
- Video "generation" currently produces scripts only; would need integration with a video service
- Uploaded files are temporarily stored in `instance/uploads/` and deleted after processing
- Video scripts are stored in `instance/videos/` 