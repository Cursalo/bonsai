import openai
from flask import current_app

def get_openai_client():
    """Initialize and return OpenAI client with API key from config."""
    client = openai.OpenAI(api_key=current_app.config['OPENAI_API_KEY'])
    return client

def classify_missed_skills(content):
    """Analyze test results and identify missed skills.
    
    Args:
        content (str): The content of the uploaded file with test results
        
    Returns:
        list: List of dictionaries containing skill names and categories
    """
    client = get_openai_client()
    
    prompt = f"""
    You are an education expert specializing in SAT test analysis. 
    Analyze the following test results and identify which specific skills or concepts the student is struggling with.
    For each missed question, identify the specific skill (e.g., 'Linear Equations', 'Comma Usage', 'Tone Analysis').
    
    Group similar skills together and provide a clean list of unique skills with appropriate categories.
    Use categories like 'Math', 'Reading & Writing', etc.
    
    Format your response as a list of JSON objects, each with 'name' and 'category':
    [
        {{"name": "Linear Equations", "category": "Math"}},
        {{"name": "Comma Usage", "category": "Reading & Writing"}},
        ...
    ]
    
    Here is the student's test result:
    {content}
    """
    
    response = client.chat.completions.create(
        model=current_app.config['OPENAI_MODEL'],
        messages=[
            {"role": "system", "content": "You are an education expert specializing in SAT test analysis."},
            {"role": "user", "content": prompt}
        ],
        response_format={"type": "json_object"}
    )
    
    try:
        # Extract and parse the JSON response
        result = response.choices[0].message.content
        import json
        skill_data = json.loads(result)
        return skill_data.get("skills", []) # Assuming the AI returns {"skills": [...]}
    except Exception as e:
        current_app.logger.error(f"Error parsing AI response for skill classification: {e}")
        # Return a fallback list if there's an error
        return [
            {"name": "Reading Comprehension", "category": "Reading & Writing"},
            {"name": "Linear Equations", "category": "Math"}
        ]

def generate_quiz_question(skill_name, skill_category):
    """Generate an original quiz question for a specific skill.
    
    Args:
        skill_name (str): The name of the skill to target
        skill_category (str): The category of the skill (Math, Reading & Writing, etc.)
        
    Returns:
        dict: Question data including text, options, and correct answer
    """
    client = get_openai_client()
    
    prompt = f"""
    Create an original SAT-style question that tests a student's understanding of {skill_name} ({skill_category}).
    
    Important requirements:
    1. The question must be 100% original - NOT copied or paraphrased from any existing SAT questions
    2. It should test the same underlying concept/skill but with unique content
    3. Format as a multiple-choice question with options A, B, C, and D
    4. Clearly mark which option is correct
    
    Format your response as a JSON object with these fields:
    {{
        "question_text": "The complete question text here",
        "options": {{"A": "First option", "B": "Second option", "C": "Third option", "D": "Fourth option"}},
        "correct_option": "The letter of the correct answer (A, B, C, or D)"
    }}
    """
    
    response = client.chat.completions.create(
        model=current_app.config['OPENAI_MODEL'],
        messages=[
            {"role": "system", "content": "You are an expert SAT question creator."},
            {"role": "user", "content": prompt}
        ],
        response_format={"type": "json_object"}
    )
    
    try:
        # Extract and parse the JSON response
        result = response.choices[0].message.content
        import json
        question_data = json.loads(result)
        return question_data
    except Exception as e:
        current_app.logger.error(f"Error parsing AI response for question generation: {e}")
        # Return a fallback question if there's an error
        return {
            "question_text": f"Placeholder question for {skill_name}: Solve this example problem related to the concept.",
            "options": {"A": "First option", "B": "Second option", "C": "Third option", "D": "Fourth option"},
            "correct_option": "A"
        }

def generate_practice_questions(skill_name, skill_category, count=3):
    """Generate multiple original practice questions for a specific skill.
    
    Args:
        skill_name (str): The name of the skill to target
        skill_category (str): The category of the skill
        count (int): Number of questions to generate (default: 3)
        
    Returns:
        list: List of question data dictionaries
    """
    questions = []
    for i in range(count):
        # Use a slightly different prompt for each question to increase variety
        question = generate_quiz_question(
            f"{skill_name} (practice question {i+1} of {count})", 
            skill_category
        )
        questions.append(question)
    return questions

def generate_video_script(skill_name, skill_category):
    """Generate a script for a video lesson on a specific skill.
    
    Args:
        skill_name (str): The name of the skill to teach
        skill_category (str): The category of the skill
        
    Returns:
        str: Video script content
    """
    client = get_openai_client()
    
    prompt = f"""
    Create a comprehensive script for a 5-minute educational video explaining the concept of {skill_name} ({skill_category}).
    
    Requirements:
    1. The content must be original and concept-based
    2. Do NOT reference or use specific College Board content or questions
    3. Include an introduction, clear explanation, examples, and summary
    4. Write in a conversational, engaging style suitable for high school students
    5. Include instructions for any visual aids or demonstrations that would be helpful
    
    Format your response as a well-structured video script with sections for:
    - Introduction (hook and relevance)
    - Core concept explanation
    - Examples (2-3 clear examples)
    - Common mistakes to avoid
    - Summary and key takeaways
    """
    
    response = client.chat.completions.create(
        model=current_app.config['OPENAI_MODEL'],
        messages=[
            {"role": "system", "content": "You are an expert educational content creator."},
            {"role": "user", "content": prompt}
        ]
    )
    
    try:
        # Return the generated script
        script = response.choices[0].message.content
        return script
    except Exception as e:
        current_app.logger.error(f"Error getting AI response for video script: {e}")
        # Return a fallback script if there's an error
        return f"Placeholder video script for explaining {skill_name}. This would normally contain a full educational video script." 