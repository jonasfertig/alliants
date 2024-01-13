import React, { useState } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Link, Switch} from 'react-router-dom'
import Analytics from "./Analytics.js";
import Feedback from "./Feedback.js";
import Datenbank from "./Datenbank.js";
import Home from "./Home.js"

function App() {

  return (
    <Router>
            
      <div className="container">
        <div className="sidebar">
          <div className="profile">
            <h3>Adem Kokud</h3>
          </div>
          <ul className="nav">
            <li>
              <Link to="/">aktuelle Aufgabe</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
            <li>
              <Link to="/datenbank">Datenbank</Link>
            </li>

            <li className='logout'>
              <Link>logout</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/analytics" element={<Analytics/>} />
          <Route path="/datenbank" element={<Datenbank/>} />
        </Routes>  
      </div>
      
  </Router>
  );
}

export default App;