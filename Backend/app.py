from flask import Flask, request, jsonify, Response
from openai import OpenAI
import os
import json
import PyPDF2
import time
from assistant import *
from db_actions import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
OPENAI_API_KEY="" #Insert your API Key here
client = OpenAI(api_key=OPENAI_API_KEY)

#TODO delete this after implementing on clientside
basePrompt = open('basePrompt.txt', 'r').read()


### routing

@app.route('/', methods=['GET', 'POST'])
def test():
    if request.method == 'GET':
        return Response("test successfull", status=201, mimetype='application/json')
    
    elif request.method == 'POST':
        testReport= request.files['files']
        #This isn't working, a text file is saved with the same name ,ending in pdf
        testReport.save(os.path.join("./uploads/", testReport.filename)) 
        
    return Response("success", status=201, mimetype='application/json')

@app.route('/createtask', methods=['POST'])
def createTask():
    try:
        file_solution = upload_file(request.files['solution'].read())
        file_task = upload_file(request.files['task'].read())
        assistant = create_assistant(file_solution.id, file_task.id)
        teacher_id = request.form.get('teacher')
        
        task_id = dbCreateTask(assistant_id=assistant.id, base_prompt=basePrompt, solution_file_id=file_solution.id, task_file_id=file_task.id, teacher_id=teacher_id)
        return Response(json.dumps({"task_id": task_id}), status=200, mimetype='application/json')
    except:
         print("Task could not be created")
       
    return Response("Task could not be created", status=400, mimetype='application/json')
    
@app.route('/createdelivery', methods=['POST'])
def createDelivery():
    try:
        pdf_reader = PyPDF2.PdfReader(request.files['student_solution'])
        solution_content = ''
        for page in range(len(pdf_reader.pages)):
            solution_content += pdf_reader.pages[page].extract_text()
        task_id = request.form.get('task_id')
        stud_id = request.form.get('stud_id')
        res = generate_response(solution_content, stud_id, getBasePrompt(task_id), getAssistantId(task_id))
        print("check")
        dbCreateDelivery(extracted_text=solution_content,
                         student_id=stud_id,
                         task_id=task_id,
                         feedback=str(res))
        print("check2")
        return Response(json.dumps({"feedback": res}), status=200, mimetype='application/json')
    except:
        print("error reading student solution")
    return Response('failure', status=400, mimetype='application/json')

@app.route('/getklassen', methods=['GET'])
def getKlassen():
    try:
        classes = getClasses()
        return Response(classes, status=200, mimetype='application/json')
    except:
        print("keine Klassen für dich")
    return Response("error klassen", status=201, mimetype='application/json')

@app.route('/getschueler', methods=['GET'])
def getSchueler():
    try:
        res = ""
        class_name = request.form.get("class_name")
        if class_name!=None:
            res = getStudentsByClass(class_name)
        else:
            res = getStudents()
        return Response(res, status=201, mimetype='application/json')
    except:
        print("err_student")
    return Response("error student", status=500, mimetype='application/json')


@app.route('/getkorrektur', methods=['GET'])
def getKorrektur():
    try:
        res = getApprovedFeedback()
        return Response(res, status=201, mimetype='application/json')
    except:
        print("err_korrektur")
    return Response("error korrektur", status=500, mimetype='application/json')

@app.route('/getfeedback', methods=['GET'])
def getFutterback():
    try:
        res = getAllFeedback()
        return Response(res, status=200, mimetype='application/json')
    except:
        print("err_feedback")
    return Response("error feedback", status=500, mimetype='application/json')

@app.route('/getopenfeedback', methods=['GET'])
def getopenFeedback():
    try:
        res = getFeedback()
        return Response(res, status=200, mimetype='application/json')
    except:
        print("err_openfeedback")
    return Response("error open feedback", status=500, mimetype='application/json')

if __name__ == '__main__':
    app.run()