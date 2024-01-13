### database requests

import json
import psycopg2

#conf_azure = "host=post-db.internal.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io port=5432 dbname=hackathon user=jonas password=winistdrin"
conf = "dbname=hackathon user=jonas password=winistdrin"
def dbrequest(statement):
    conn = None
    row = None
    try:
        conn = psycopg2.connect(conf)
        cur = conn.cursor()
        cur.execute(statement)
        row = cur.fetchone()[0]
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return row

def dbrequestMultiple(statement):
    conn = None
    rows = None
    try:
        conn = psycopg2.connect(conf)
        cur = conn.cursor()
        cur.execute(statement)
        rows = cur.fetchall()
        print("The number of parts: ", cur.rowcount)
        for row in rows:
            print(row)
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return json.dumps(rows)


def dbCreateTask(assistant_id, base_prompt, solution_file_id, task_file_id, teacher_id):
    ### SQL-Statement
    sql = """INSERT INTO task(assistant_id, base_prompt, solution_file_id, task_file_id, teacher_id)
             VALUES(%s,%s,%s,%s,%s) RETURNING task_id;"""
    conn = None
    task_id = None
    try:
        # connect to the PostgreSQL database
        conn = psycopg2.connect(conf)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (assistant_id, base_prompt, solution_file_id, task_file_id, teacher_id))
        # get the generated id back
        task_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return task_id

def dbCreateDelivery(extracted_text, student_id, task_id, feedback):
    ### SQL-Statement
    sql = """INSERT INTO delivery(extracted_text, student_id, task_id, feedback, feedback_approved)
             VALUES(%s,%s,%s,%s,%s) RETURNING delivery_id;"""
    conn = None
    delivery_id = None
    try:
        # connect to the PostgreSQL database
        conn = psycopg2.connect(conf)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (extracted_text, student_id, task_id, feedback, False))
        # get the generated id back
        delivery_id = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return delivery_id

def dbApproveDelivery(delivery_id):
    ### SQL-Statement
    sql = """ UPDATE delivery
                SET feedback_approved = %s
                WHERE delivery_id = %s"""
    conn = None
    updated_rows = 0
    try:
        # connect to the PostgreSQL database
        conn = psycopg2.connect(conf)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql, (True, delivery_id))
        # get the generated id back
        updated_rows = cur.rowcount
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return updated_rows

def getBasePrompt(task_id):
    res=dbrequest("SELECT base_prompt FROM task WHERE task_id=" + str(task_id))
    return res

def getAssistantId(task_id):
    res=dbrequest("SELECT assistant_id FROM task WHERE task_id=" + str(task_id))
    return res

def getStudName(stud_id):
    res=dbrequest("SELECT firstname FROM student WHERE student_id=" + str(stud_id))
    return res

def getClasses():
    res=dbrequestMultiple("SELECT name FROM class")
    return res

def getStudents():
    res=dbrequestMultiple("SELECT firstname, lastname FROM student")
    return res

def getStudentsByClass(class_name):
    res=dbrequestMultiple("SELECT firstname, lastname FROM student WHERE class='" + str(class_name) + "'")
    return res

def getFeedback():
    res=dbrequestMultiple("SELECT student_id, feedback FROM delivery WHERE feedback_approved=False")
    return res

def getApprovedFeedback():
    res=dbrequestMultiple("SELECT student_id, feedback FROM delivery WHERE feedback_approved=True")
    return res

def getAllFeedback():
    res=dbrequestMultiple("SELECT student_id, feedback FROM delivery")
    return res

def getTasks():
    res=dbrequestMultiple("SELECT task_id, assistant_id, base_prompt FROM task")
    return res

def getAssistant(task_id):
    res=dbrequest("SELECT assistant_id, base_prompt FROM task WHERE task_id=" + str(task_id))
    return res

def getTask(task_id):
    res=dbrequestMultiple("SELECT task_id, assistant_id, base_prompt FROM task WHERE task_id=" + str(task_id))
    return res

if __name__ == '__main__':
    #testing purposes
    print(getStudentsByClass("11a"))
    print(getStudents())
    print(getFeedback())
    print(getAllFeedback())
    print(getApprovedFeedback())
    print(getTasks())
    print(getTask(1))
    print(getAssistant(1))