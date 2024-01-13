from openai import OpenAI
import time
import PyPDF2
from db_actions import *

basePrompt = open('basePrompt.txt', 'r').read()

OPENAI_API_KEY= "" # Insert your api key here
client = OpenAI(api_key=OPENAI_API_KEY)
def create_assistant(file_solution, file_task):
    assistant = client.beta.assistants.create(
        name="English Teacher Assistant",
        description=basePrompt,
        tools=[{"type": "retrieval"}],
        model="gpt-4-1106-preview",
        file_ids=[file_solution, file_task],
    )
    return assistant

def generate_response(solution_content, stud_id, description_user, assistant_id):
    # Check if there is already a thread_id for the stud_id
    thread_id = check_if_thread_exists(stud_id)
    name = getStudName(stud_id)
    # If a thread doesn't exist, create one and store it
    if thread_id is None:
        print(f"Creating new thread for {name} with stud_id {stud_id}")
        thread = client.beta.threads.create()
        store_thread(stud_id, thread.id)
        thread_id = thread.id

    # Otherwise, retrieve the existing thread
    else:
        print(f"Retrieving existing thread for {name} with stud_id {stud_id}")
        thread = client.beta.threads.retrieve(thread_id)

    # Add system message to thread
    system_message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=description_user )    

    # Add message to thread
    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=solution_content,
    )

    # Run the assistant and get the new message
    new_message = run_assistant(thread, assistant_id)
    return new_message

def run_assistant(thread, assistant_id):
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
    return new_message

def upload_file(path):
    # Upload a file with an "assistants" purpose
    file = client.files.create(file=path, purpose="assistants")
    return file

if __name__ == '__main__':
    # Testing
    file_solution = upload_file("./test_pdf_files/Hackathon_Lösungsvorschlag.pdf")
    file_task = upload_file("./test_pdf_files/Hackathon_aufgabenstellung.pdf")
    pdf_reader = PyPDF2.PdfReader("./test_pdf_files/Hackathon_Solution_peter.pdf")
    solution_content = ''
    for page in range(len(pdf_reader.pages)):
        solution_content += pdf_reader.pages[page].extract_text()
    assistant = create_assistant(file_solution, file_task)
    assistant_id = assistant.id
    print(generate_response(solution_content, 1, "Peter", basePrompt, assistant.id))
    