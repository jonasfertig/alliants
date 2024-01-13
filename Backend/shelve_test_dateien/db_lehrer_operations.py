import shelve

#db-operations on Leher
def createLehrer(firstname, lastname):
    try:
        with shelve.open('db/lehrer') as db:
            db[str(firstname + lastname)]={"firstname": firstname, "lastname": lastname}
            print(str(firstname + lastname))
            db.close()
    except:
        print("could not create lehrer")
        return False
    return True

def alterLehrer(firstname, lastname):
    if lehrerExists(id):
        with shelve.open('db/lehrer') as db:
            try:
                db[str(firstname + lastname)] = {"firstname": firstname, "lastname": lastname}
                db.close()
                return True
            except:
                print("could not alter lehrer mit id: " + id)
                return False
    return False

def getLehrerByName(firstname, lastname):
    lehrer = None
    if lehrerExists(firstname, lastname):
        try:
            with shelve.open('db/lehrer') as db:
                lehrer = db[str(firstname + lastname)] 
            db.close()
        except:
            print("lehrer " + id + " does not exist")
    return lehrer

def lehrerExists(firstname, lastname):
    flag = False
    try:
        with shelve.open('db/lehrer') as db:
            flag = str(firstname + lastname) in db
            db.close()
    except:
        print("can not check if lehrer " + id + " exists")
    return flag

def getLehrer():
    lehrer = None
    try:
        with shelve.open('db/lehrer') as db:
            lehrer = list(db.keys())
            db.close()
    except:
        print("no db for lehrer")
    return lehrer

if __name__ == '__main__':
    print(createLehrer("Henner", "Gimpel"))
    print(getLehrerByName("Henner", "Gimpel"))
    print(getLehrer())