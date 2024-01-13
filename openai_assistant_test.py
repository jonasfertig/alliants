import streamlit as st
import openai
import shelve
import os
from dotenv import load_dotenv
from openai import OpenAI
import glob
import PyPDF2
import time

# Load the .env file
load_dotenv()

# Set up OpenAI credentials
client = OpenAI()

# UI layout
st.title("English Teacher Assistant")

# --------------------------------------------------------------
# Upload file
# --------------------------------------------------------------
def upload_file(path):
    # Upload a file with an "assistants" purpose
    file = client.files.create(file=open(path, "rb"), purpose="assistants")
    return file

# Data input (Task and Solution) for testing purposes
file_solution = upload_file("../Hackathon_Team1_private/Data/Assistant/Hackathon_Lösungsvorschlag.pdf")
file_task = upload_file("../Hackathon_Team1_private/Data/Assistant/Hackathon_aufgabenstellung.pdf")

# Description input
description_user = st.text_area("Enter Description")
base_prompt = "Description: Evaluate student submissions, determine points earned, and explain deductions. Identify weaknesses. Generate exercises for improvement if the score is below half. User Instructions: Evaluate solutions, explain deductions, highlight mistakes. Identify weaknesses. If the score is less than half, recommend seeking extra exercises in the next prompt. Output: Provide detailed assessment, deduction explanations, identify weaknesses, and suggest referring to the next prompt for extra exercises"

# Correction section
stud_id = st.text_input("Student ID")
name = st.text_input("Name")
student_solution_file = st.file_uploader("Upload Solution PDF", type="pdf")

# --------------------------------------------------------------
# Create assistant
# --------------------------------------------------------------
def create_assistant(file_solution, file_task):
    """
    You currently cannot set the temperature for Assistant via the API.
    """
    assistant = client.beta.assistants.create(
        name="English Teacher Assistant",
        description=base_prompt,
        tools=[{"type": "retrieval"}],
        model="gpt-4-1106-preview",
        file_ids=[file_solution.id, file_task.id],
    )
    return assistant

# --------------------------------------------------------------
# Clicking the "Correct" Button
# --------------------------------------------------------------
if st.button("Correct"):
    # Check if a file was uploaded
    file_extension = os.path.splitext(student_solution_file.name)[1]

    # Read the file content
    if file_extension == '.pdf':
        pdf_reader = PyPDF2.PdfReader(student_solution_file)
        solution_content = ''
        for page in range(len(pdf_reader.pages)):
            solution_content += pdf_reader.pages[page].extract_text()
    else:
        raise ValueError(f"Unsupported file type: {file_extension}") 

    # Create the assistant
    assistant = create_assistant(file_solution, file_task)
    assistant_id = assistant.id

    # Set the "base prompt"
    if description_user == "":
        description_user = base_prompt

    # Thread management
    def check_if_thread_exists(stud_id):
        with shelve.open("threads_db") as threads_shelf:
            return threads_shelf.get(stud_id, None)

    def store_thread(stud_id, thread_id):
        with shelve.open("threads_db", writeback=True) as threads_shelf:
            threads_shelf[stud_id] = thread_id

    # Generate response
    def generate_response(solution_content, stud_id, name):
        # Check if there is already a thread_id for the stud_id
        thread_id = check_if_thread_exists(stud_id)

        # If a thread doesn't exist, create one and store it
        if thread_id is None:
            print(f"Creating new thread for {name} with stud_id {stud_id}")
            thread = client.beta.threads.create()
            store_thread(stud_id, thread.id)
            thread_id = thread.id
        else:
            print(f"Retrieving existing thread for {name} with stud_id {stud_id}")
            thread = client.beta.threads.retrieve(thread_id)

        # Add system message to thread
        system_message = client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=description_user, 
        )    

        # Add message to thread
        message = client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=solution_content,
        )

        # Run the assistant and get the new message
        new_message = run_assistant(thread)
        print(f"To {name}:", new_message)
        return new_message

    # Run assistant and get the new message
    def run_assistant(thread):
        # Retrieve the Assistant
        assistant = client.beta.assistants.retrieve(assistant_id)

        # Run the assistant
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant_id,
        )

        # Wait for completion
        while run.status != "completed":
            # Be nice to the API
            time.sleep(0.5)
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

        # Retrieve the Messages
        messages = client.beta.threads.messages.list(thread_id=thread.id)
        new_message = messages.data[0].content[0].text.value
        print(f"Generated message: {new_message}")
        return new_message

    # Test the assistant
    new_message = generate_response(solution_content, stud_id, name)
    st.write(new_message)
# --------------------------------------------------------------
# Clicking the "Config" Button
# --------------------------------------------------------------
if st.button("Config"):
    # Create the assistant
    assistant = create_assistant(file_solution, file_task)
    assistant_id = assistant.id
