import sys
import random
from datetime import datetime, timedelta
from faker import Faker
import string
import json

# Get a random date as a string
def get_random_date(start_date, end_date):
    start_datetime = datetime.strptime(start_date, '%Y-%m-%d')
    end_datetime = datetime.strptime(end_date, '%Y-%m-%d')
    total_days = (end_datetime - start_datetime).days
    random_days = random.randint(0, total_days)
    random_date = start_datetime + timedelta(days=random_days)
    return random_date.date().strftime('%Y-%m-%d')

# Generate a random email address
def generate_random_email():
    username_length = random.randint(5, 10)
    username = ''.join(random.choices(string.ascii_lowercase, k=username_length))

    domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
    domain = random.choice(domains)

    email = f"{username}@{domain}"

    return email

def generate_random_string(length):
    # Include uppercase, lowercase letters, and digits
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string

# Check if the number of therapists is provided as a command-line argument
if len(sys.argv) < 2:
    print("Please provide the number of therapists as a command-line argument.")
    sys.exit(1)

try:
    number_of_therapists = int(sys.argv[1])
except ValueError:
    print("Invalid number of therapists. Please provide a valid integer.")
    sys.exit(1)

start_date = '2023-01-01'
end_date = '2023-06-30'
potential_behaviors = ["Vocal", "Slapping", "Punching", "Crying", "Self-Injurious Behavior", "Elopement", "Running", "EO", "SR"]
potential_control_levels = ["No Control", "Moderate Control", "High Control"]
universities = ["Harvard University", "Stanford University", "Massachusetts Institute of Technology", "University of Oxford", "University of Cambridge", "California Institute of Technology", "Princeton University", "Yale University", "Columbia University", "University of Chicago", "Vanderbilt University", "Fisk University"]
titles = ["BCBA", "MD", "PhD", "RN", "DDS", "CPA", "JD", "MPH", "MSW", "MBA"]
faker = Faker()

database = {}
therapists = []
authData = []

for _ in range(number_of_therapists):
    therapist_id = random.randint(1000, 10000)
    therapist_email = generate_random_email()
    therapistObj = {
        "id": therapist_id,
        "therapist_id": f"Therapist {therapist_id}",
        "affiliation": random.choice(universities),
        "title": random.choice(titles),
        "confidence": random.randint(1, 4),
        "email": therapist_email
    }

    authObj = {
        "id": therapist_id,
        "email": therapist_email,
        "password": generate_random_string(10)
    }

    number_of_existing_patients = random.randint(1, 30)
    patients = []

    for _ in range(number_of_existing_patients):
        learner_id = random.randint(1000, 10000)
        number_of_sessions = random.randint(1, 15)
        learnerObj = {
                "id": learner_id,
                "learner_id": f"learner {learner_id}",
                "last_time_used": get_random_date(start_date, end_date),
                "number_of_sessions": number_of_sessions
            }

        sessions = []

        for _ in range(number_of_sessions):
            sessionId = random.randint(1000, 10000)
            sessionObj = {
                    "id": sessionId,
                    "session_name": sessionId,
                    "behavior_analyst_name": faker.name(),
                    "behaviors": random.sample(potential_behaviors, random.randint(1, len(potential_behaviors))),
                    "comments": [faker.sentence(nb_words=30) for _ in range(random.randint(1, 5))],
                    "rais": random.randint(1, 5),
                    "rpis": random.randint(1, 5),
                    "eo_total_time": random.randint(1, 300),
                    "sr_total_time": random.randint(1, 300),
                    "total_time": random.randint(1, 1000),
                    "total_eo_pbs": random.randint(1, 20),
                    "total_sr_pbs": random.randint(1, 20),
                    "lowess_pb_rate": random.randint(1, 20),
                    "lowess_sr_rate": random.randint(1, 20)
                }
            sessions.append(sessionObj)
        
        learnerObj["sessions"] = sessions
        patients.append(learnerObj)
    
    therapistObj["patients"] = patients
    therapists.append(therapistObj)
    authData.append(authObj)

database["therapists"] = therapists
database["authdata"] = authData

# Save the database as JSON
with open('data.json', 'w') as json_file:
    json.dump(database, json_file)

# Create a schema from the dictionary
def create_schema_from_dict(data_dict):
    schema = {
        "type": "object",
        "properties": {}
    }

    for key, value in data_dict.items():
        if isinstance(value, dict):
            nested_schema = create_schema_from_dict(value)
            schema["properties"][key] = nested_schema
        else:
            value_type = type(value).__name__.lower()
            schema["properties"][key] = {"type": value_type}

    return schema

schema = create_schema_from_dict(database)

# Save the schema as JSON
with open('schema.json', 'w') as json_file:
    json.dump(schema, json_file, indent=4)