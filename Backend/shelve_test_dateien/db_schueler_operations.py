import shelve

#db-operations on schueler
def createSchueler(firstname, lastname, age):
    try:
        with shelve.open('db/schueler') as db:
            db[str(lastname + firstname)]={"firstname": firstname, "lastname": lastname, "age": age}
            print(str(lastname + firstname))
            db.close()
    except:
        print("could not create schueler")
        return False
    return True

def alterSchueler(firstname, lastname, age):
    if schuelerExists(id):
        with shelve.open('db/schueler') as db:
            try:
                db[str(lastname + firstname)] = {"firstname": firstname, "lastname": lastname, "age": age}
                db.close()
                return True
            except:
                print("could not alter schueler mit id: " + id)
                return False
    return False

def getSchuelerByName(firstname, lastname):
    schueler = None
    if schuelerExists(id):
        try:
            with shelve.open('db/schueler') as db:
                schueler = db[str(lastname + firstname)] 
            db.close()
        except:
            print("schueler " + str(lastname + firstname) + " does not exist")
    return schueler

def schuelerExists(firstname, lastname):
    flag = False
    try:
        with shelve.open('db/schueler') as db:
            flag = str(lastname + firstname) in db
            db.close()
    except:
        print("can not check if schueler " + id + " exists")
    return flag

def getSchueler():
    schueler = None
    try:
        with shelve.open('db/schueler') as db:
            schueler = list(db.keys())
            db.close()
    except:
        print("no db for schueler")
    return schueler

if __name__ == '__main__':
    print(createSchueler("Jan", "Gfrerer", 14))
    print(createSchueler("Adem", "Kokud", 15))
    print(getSchueler())