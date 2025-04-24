from app import create_app, db
from app.models import User, Skill, PracticeTest # Import models needed for seeding

app = create_app()

@app.cli.command('seed-db')
def seed_db():
    """Seeds the database with initial data."""
    print("Seeding database...")
    try:
        # Create Sample User
        user = User.query.filter_by(username='testuser').first()
        if not user:
            user = User(username='testuser')
            user.generate_api_key() # Generate key for new user
            db.session.add(user)
            print(f"Added user: {user.username}")
            print(f"API Key for testuser: {user.api_key}") # Print the key
        else:
            # Ensure existing user has an API key
            if not user.api_key:
                user.generate_api_key()
                print(f"Generated API key for existing user: {user.username}")
                print(f"API Key for testuser: {user.api_key}") # Print the key
            else:
                print(f"User '{user.username}' already exists (API Key: {user.api_key}).")

        # Create Sample Practice Test
        test_id = "Bluebook Test 1"
        if not PracticeTest.query.filter_by(identifier=test_id).first():
            test1 = PracticeTest(identifier=test_id)
            db.session.add(test1)
            print(f"Added test: {test1.identifier}")
        else:
            test1 = PracticeTest.query.filter_by(identifier=test_id).first()
            print(f"Test '{test1.identifier}' already exists.")

        # Create Sample Skills
        skills_to_add = [
            {"name": "Linear Equations", "category": "Math"},
            {"name": "Comma Usage", "category": "Reading & Writing"},
            {"name": "Tone Analysis", "category": "Reading & Writing"},
            {"name": "Data Interpretation", "category": "Math"},
            {"name": "Vocabulary in Context", "category": "Reading & Writing"}
        ]
        for skill_data in skills_to_add:
            if not Skill.query.filter_by(name=skill_data['name']).first():
                skill = Skill(name=skill_data['name'], category=skill_data['category'])
                db.session.add(skill)
                print(f"Added skill: {skill.name}")
            else:
                print(f"Skill '{skill_data['name']}' already exists.")

        db.session.commit()
        print("Database seeded successfully!")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding database: {e}")

if __name__ == '__main__':
    app.run(debug=True) 