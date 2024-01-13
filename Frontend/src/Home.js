import React, { useState, Component } from 'react';
import axios from "axios"
import FormData from "form-data"
import Modal from "./Modal"

const backend = "http://localhost:5000"

function Home(){
  const [message, setMessage] = useState('');
  
  //Aufgabenfiles
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  
  //Solutionfiles
  const [file2, setFile2] = useState(null);
  const [fileName2, setFileName2] = useState('');

  // Files for schuelers
  const [schuelerFile, setFile3] = useState('');
  const [schuelerFileName, setFileName3] = useState('');


  const [inputStudent, setStudentFields] = useState([{ name: '', file: null}]);

  const handleAddInput = () => {
    setStudentFields(
      prevFields => [...prevFields, { name: '', file: null }],
    );
  };

  const handleInputChange = (index, value) => {
    const updatedFields = [...inputStudent];
    updatedFields[index].value = value;
    setStudentFields(updatedFields);
  };

  const handleRemoveInput = (index) => {
    const updatedFields = [...inputStudent];
    updatedFields.splice(index, 1);
    setStudentFields(updatedFields);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage('');
  };

  //Set the file handle change and set the file to selectedFile
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Überprüfe, ob eine Datei ausgewählt wurde und ob es sich um eine PDF handelt
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);

      console.log("Habe Task file1 created:", selectedFile.name)
    } else {
      console.log('Bitte wähle eine gültige PDF-Datei aus.');
    }
  };

  //Set the file handle change and set the file to selectedFile
  const handleFileChange2 = (e) => {
    const selectedFile = e.target.files[0];
    
    // Überprüfe, ob eine Datei ausgewählt wurde und ob es sich um eine PDF handelt
    if (selectedFile && selectedFile.type === 'application/pdf') {

      setFile2(selectedFile);
      setFileName2(selectedFile.name);

      console.log("Habe Solution file2 created:", selectedFile.name)
    } else {
      console.log('Bitte wähle eine gültige PDF-Datei aus.');
    }
  };

  //Set the file handle change and set the file to selectedFile
  const handleSchuelerChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Überprüfe, ob eine Datei ausgewählt wurde und ob es sich um eine PDF handelt
    if (selectedFile && selectedFile.type === 'application/pdf') {

      setFile3(selectedFile);
      setFileName3(selectedFile.name);

      console.log("Habe Schueler created:", selectedFile.name)
    } else {
      console.log('Bitte wähle eine gültige PDF-Datei aus.');
    }
  };


  //Handle the post upload of a pdf
  const handleUploadClick = () => {
    const url = backend + '/createtask';
    const form = new FormData();

    if (file&&file2) {
      
      form.append('task', file);
      form.append('solution', file2);
      form.append('teacher', "1");

       // Now, make the POST request using axios SEND PDF TO BACKEND
      axios.post(url, form, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
        transformRequest: form => form, 
      })
      .then(response => {
        console.log(response.data)
        console.log('Success! Did a post with pdf', file.name);
      })
      .catch(error => {
        console.error('Error!', error);
      });
    } else {
      console.log('No file selected');
    }
  };


   
  //Drag Zone Functions
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e) => {
    console.log('Drag over');
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    console.log('Drag leave');
    setDragActive(false);
  };

  const handleDrop = (e) => {
    console.log('Drop');
    e.preventDefault();
    setDragActive(false);
    setFile(e.dataTransfer.files[0]);
    console.log('File uploaded:', e.dataTransfer.files[0]);
  };


  //Save Functions students
  const handleSave = () => {
    const url = backend + '/createdelivery';
    const form = new FormData();

    if (schuelerFile) {
      
      form.append('student_solution', schuelerFile);
      form.append('task_id', "1");
      form.append('stud_id', "1");

       // Now, make the POST request using axios SEND PDF TO BACKEND
      axios.post(url, form, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
        transformRequest: form => form, 
      })
      .then(response => {
        console.log(response.data)
        console.log('Success! Did a post with pdf', file.name);
      })
      .catch(error => {
        console.error('Error!', error);
      });
    } else {
      console.log('No file selected');
    }
  };

  //GET Test
  function getData(){
    const url = 'https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/test';
    axios.get(url)
    .then(response => {
        console.log('Success!', response);
    })
    .catch(error => {
        console.error('Error!', error);
    });
  };

  //GET Test
  function getRiesterrente(){
    const url = 'https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/riesterrente';
    axios.get(url)
    .then(response => {
        console.log('Success!', response);
    })
    .catch(error => {
        console.error('Error!', error);
    });
  };

      //GET Test
  function getKlassen(){
    const url = 'https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/getklassen';
    axios.get(url)
    .then(response => {
        console.log('Success!', response);
    })
    .catch(error => {
        console.error('Error!', error);
    });
  };
  
    //GET Test
  function getSchueler(){
    const url = 'https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/getschueler';
    axios.get(url)
    .then(response => {
        console.log('Success!', response);
    })
    .catch(error => {
        console.error('Error!', error);
    });
  };

  function getKorrektur(){
    const url = 'https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/getkorrektur';
    axios.get(url)
    .then(response => {
        console.log('Success!', response);
    })
    .catch(error => {
        console.error('Error!', error);
    });
  };

  
  function getFeedback(){
    const url = 'https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/getfeedback';
    axios.get(url)
    .then(response => {
        console.log('Success!', response);
    })
    .catch(error => {
        console.error('Error!', error);
    });
  };
 
  //POST SEND SINGLE PDF
  function sendData() {
    const url = 'https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/test';
    const data = {
      "firstName": 'Fred',
      "lastName": 'Flintstone'
    };

    axios.post(url, data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

    //POST SEND TASKS
    function sendTasks() {
      const url = 'https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/test';
      const data = {
        "firstName": 'Fred',
        "lastName": 'Flintstone'
      };
  
      axios.post(url, data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }

  // console.log("get Data");
  // getData()
  // console.log("get klassen");
  // getKlassen();
  // console.log("get korrektur");
  // getKorrektur();
  // console.log("get feedback");
  // getFeedback();
  // console.log("get riesterrente");
  // getRiesterrente();
  // console.log("get schueler");
  // getSchueler();


  // console.log("Send tasks")
  // sendTasks();


    return (
    <div className="main">
      <div className='header'>aktuelle Aufgabe</div>

      <div className='upload-container'>
        <label className='label-header'>Aufgabe erstellen</label>
        <div onSubmit={sendMessage}>
          <textarea 
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='test prompt'
          />
          <div className='align-right'>
            <button className="upload-button" type="submit">Send</button>
          </div>
        </div>
      </div>
        
      <div className="upload-container">
        <div className="drop-zone" onDragOver={handleDragOver} onDragLeave={handleDragLeave }onDrop={handleDrop}
        style={{
          border: dragActive ? '2px solid blue' : '1.5px solid black',
          padding: 20,
        }}
        >
          {fileName ? (
            <div>
              <p>{fileName}</p>
              <button onClick={() => setFileName('')}>Remove file</button>
            </div>

          ) :  (
            <div className='icon'>
              <label for='file-upload' className='label_2'>Aufgabe hochladen</label>
              <input
                id='file-upload'
                type="file"
                onChange={handleFileChange}
                className="upload-input"
              />
            </div>
          )}
        </div> 
      </div>

      <div className='upload-container'>
        <div className="drop-zone" onDragOver={handleDragOver} onDragLeave={handleDragLeave }onDrop={handleDrop}
        style={{            
          border: dragActive ? '2px solid blue' : '1.5px solid black',
          padding: 20,
          }}
        >
          {fileName2 ? (
            <div>
              <p>{fileName2}</p>
              <button onClick={() => setFileName2('')}>Remove file</button>
            </div>

          ) :  (
            <div className='icon'>
            <label for='file-upload2' className='label_2'>Lösung hochladen</label>
            <input
              id='file-upload2'
              type="file"
              onChange={handleFileChange2}              
              className="upload-input"
            />
            </div>
          )}
          </div>


        <div className='align-right'>
          <button onClick={handleUploadClick} className="upload-button">
            Upload
          </button>
        </div>
          
      <div className='upload-container'>
        <div>
          <label className='label-header'>Schüler hinzufügen</label>
        <div>
          {inputStudent.map((field, index) => (
            <div className='input-form' key={index}>
              <input
                className='text-input'
                type="text"
                placeholder='Name eingeben'
                defaultValue={field.name}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            {schuelerFileName ? (
                <div className='schueler-upload'>
                  <label>{schuelerFileName}</label>
                  <button className='schueler-upload-button' onClick={() => setFileName3('')}>Remove file</button>
                </div>

              ) :  (
                <div className='icon2'>
                  <input
                    id='file-upload3'
                    type="file"
                    onChange={handleSchuelerChange}              
                    className="upload-input"
                  />
                  <label for='file-upload3' className='label_3'>Lösung des Schülers</label>
                  <button className='x-button' onClick={() => handleRemoveInput(index)}>x</button>
                </div>
              )}
              {/* <input
                type="file"
                onChange={(e) => {
                  const updatedStudents = [...inputStudent];
                  updatedStudents[index].file = e.target.files[0];
                  setStudentFields(updatedStudents);
                }}
              /> */}
              
            </div>
          ))}
          <div className='align-center'>
            <button className='plus' onClick={handleAddInput}>+</button>
          </div>
          <div className='align-right'>
            <button className='upload-button' onClick={handleSave}>Save</button>
          </div>
          
          </div>
        </div>
      </div>


      <Modal/>
      <div className='padding'>
        test
      </div>
    </div>
    </div>
    )
    
  };
  
  export default Home;