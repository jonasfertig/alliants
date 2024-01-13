import './Feedback.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from "axios"

const Feedback = () => {

  const [klassen, setKlassen] = useState([]);
  const [schueler, setSchueler] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // GET Klassen
    axios.get('https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/getklassen')
    .then(response => {
      setKlassen(response.data); // Annahme: Die Feedback-Daten werden als Array von Objekten zurückgegeben
    })
    .catch(error => {
      console.error('Error fetching Feedback!', error);
    });

    // GET Schueler
    axios.get('https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/getschueler')
    .then(response => {
      setSchueler(response.data); // Annahme: Die Feedback-Daten werden als Array von Objekten zurückgegeben
    })
    .catch(error => {
      console.error('Error fetching Feedback!', error);
    });

    // GET Feedback
    axios.get('https://backend-test.kindsea-9da9c459.germanywestcentral.azurecontainerapps.io/getfeedback')
      .then(response => {
        setFeedback(response.data); // Annahme: Die Feedback-Daten werden als Array von Objekten zurückgegeben
      })
      .catch(error => {
        console.error('Error fetching Feedback!', error);
      });
  }, []); // Der leere Array als zweites Argument stellt sicher, dass dieser Effekt nur einmal beim Laden der Komponente ausgeführt wird

  //Log the variables
  console.log("Alle Klassen:" , klassen);
  console.log("Alle Schüler:" , schueler);
  console.log("Alle Feedbacks:", feedback);

  //Handling classes
  const [selectedClass, setSelectedClass] = React.useState(null);

  // const handleDropdownChange = (event) => {
  //   setSelectedClass(event.target.value);
  // }

  const classDataMap = {
    '10a': [
      //{ id: feedback.id, name: schueler.firstname + " " + schueler.lastname, feedback:  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"},
      { 
        id: 1, 
        name: 'Peter Smith', 
        feedback: 'Peter\'s Evaluation:\n\n' +
        
        'Exercise 1: Comprehension and Analysis Solution - 8/10 Peter demonstrates a good understanding of the literary device "anaphora" and explains its purpose effectively. However, instead of mentioning \'her\' it should have been \'the\' to correctly attribute the explanation to the period being described, rather than an individual. Additionally, while the response is insightful, it lacks depth in analysis regarding the full range of juxtapositions present in Dickens’ excerpt.\n\n' +
        
        'Exercise 2: Creative Writing Prompt Solution - 7/10 The diary entry captures a unique premise where spoken words are precious, and Peter uses descriptive passages to evoke the silent world he imagines. The mistake here is "smiles replaced sentences," as it\'s somewhat vague how smiles can perform the communicative function of sentences. While creative, the reader is left wanting more explanation about the world and law mentioned. The narrative also has room for more sensory details to enrich the scene.\n\n' +
        
        'Exercise 3: Argumentative Essay Solution - 9/10 Peter adeptly navigates the topic, articulating the importance of human cognitive abilities in the context of AI. The argument is coherent and well-structured. He engages with potential counterarguments effectively, reinforcing his position. However, Peter might have strengthened his argument by providing more examples of AI failing to capture nuances. The writing also has a minor typographical issue with excess spaces before \'is the\'.\n\n'+ 
        
        'Peter’s primary weakness is in the lack of comprehensive depth in his analysis and creative explanation. For improvement, Peter should flesh out his ideas with more specific examples and details, ensuring that every claim and creative decision is substantiated and vivid.\n\n' +
        
        'Total Score: 24/30\n\n'+
        
        'Peter should thoroughly review the commentary here and refer to the next prompt for additional exercises aimed at addressing the identified weaknesses.'
      },
      {
        id: 2, 
        name: 'Liselote Jürgens', 
        feedback: 'Liselote\'s Evaluation:\n\n' +
        'Exercise 1: Comprehension and Analysis Solution - 9/10 Liselote does an excellent job explaining the use of "anaphora" and provides a rich interpretative analysis of Dickens\' use of this literary device. However, the response slightly oversteps into flowery language ("Yin and Yang"), which, while evocative, does not directly enhance the analysis of the literary technique. The inclusion of directly related literary terms or examples could further strengthen the analysis.\n\n' +
        'Exercise 2: Creative Writing Prompt Solution - 8/10 The entry is expressive and makes powerful use of the creative premise, conveying the weight and power of words in a world where they are limited. There\'s good use of metaphor, and the thoughtfulness is evident. However, there are slight redundancies, such as "a morning tinged with silence" after already mentioning "lexicon austerity," which could be polished for brevity and impact.\n\n' +
        'Exercise 3: Argumentative Essay Solution - 10/10 The argument against AI replacing human textual analysis is robust, well-articulated, and comprehensive. Liselote skillfully intertwines logical reasoning with rich language to drive the point home. There is a solid structure, anticipation of counterarguments, and a clear conclusion. The writing is free from significant errors, demonstrating a strong command of the argumentative style.\n\n' +
        'Liselote’s primary weakness is a tendency towards overly decorative language that occasionally obfuscates rather than clarifies her point. To improve, exercises should focus on brevity and precision in communication, while maintaining the richness of her prose.\n\n' +
        'Total Score: 27/30\n\n' +
        'For further enhancement, Liselote is advised to work on concise expression. Please refer to the next prompt for additional exercises tailored to address these areas.'
      }],
    '10b': [
      { id: 1, name: 'Alina Müller', feedback: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et' },
      { id: 2, name: 'Sarah Johnson', feedback: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et' },
   
    ],
    '11a': [
      { id: 1, name: "Jonathan Bär", feedback: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et" },
      { id: 2, name: 'Emily Kim', feedback: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et' },
      
    ],
    '11b': [
      { id: 1, name: "Adem Löwe", feedback: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et" },
      { id: 2, name: 'test Kim', feedback: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et' },
      
    ],
  };

  const classData = selectedClass ? classDataMap[selectedClass] : [];

  return(
      <div className="main">
        <label className="header"> Feedback</label>
        <div className='upload-container'>
          <div className="dropdown">
            <button className="dropbtn">{selectedClass || "Klassen"}</button>
            <div className="dropdown-content">
              {Object.keys(classDataMap).map((key) => (
                <a href="#" key={key} onClick={() => setSelectedClass(key)}>
                  Klasse {key}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='upload-container'>
          {classData && (
            <table id='students'>
              <thead>
                  <tr>
                    <th style={{width: '200px'}}>Name</th>
                    <th style={{width: '500px'}}>Feedback</th>
                    <th style={{width: '200px'}}>Chat with your feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.map((data) => 
                    <tr key={data.id}>
                      <td style={{width: '200px',height:'200px'}}><strong>{data.name}</strong></td>
                      <td style={{width: '500px',height:'200px'}}><textarea className='textarea-f'>{data.feedback}</textarea></td>
                      <td style={{width: '200px', height: '200px'}}><textarea className='textarea-f' type="text" style={{width: '100%'}} placeholder="Enter your prompt" /></td>
                    </tr>
                    )}
                </tbody>
            </table>
          )}
        </div>
        <div className='padding'>
        test
      </div>
      </div>
    )
  };
export default Feedback;