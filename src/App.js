import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link, Redirect } from 'react-router-dom'
import ForgetPassword from './forgetPassword/forgetPassword';
import StartStop from './StartStop/StartStop';
import { Button, Image, Modal, Form, Row, Col } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundimg from './assets/Images/background.svg';
import start from './assets/Images/start.svg';
import stop from './assets/Images/stop.svg';
import React, { useState, useEffect } from 'react';
import RecordRTC from 'recordrtc';
import Login from './login/login';
import AudioRecorder from "./AudioRecorder";
import Sidebar from './sidebar/Sidebar';
import Forgetpasschange from './forgetPassword/forgetpasschange';
import ListOfRequirements from './ListOfRequirements/ListOfRequirements';
import ListOfCandidate from './ListOfCandidate/ListOfCandidate';
import CandidateDetails from './CandidateDetails/CandidateDetails';
function App() {

 
  return (
    <div className="App">
      <Router>
        <Routes>

        <Route exact path='/' element={<Login />} />
          <Route exact path='/forgetpassword' element={<ForgetPassword />} />
          <Route exact path='/sidebar' element={<Sidebar />} />
          <Route exact path='/listofrequirements' element={<ListOfRequirements />} />
          <Route exact path='/listofcandidate' element={<ListOfCandidate />} />
          <Route exact path='/candidatedetails' element={<CandidateDetails />} />
          
          <Route exact path='/resetPassword' element={< Forgetpasschange />} />
        </Routes>
      </Router>
    

    </div>
  );
}

export default App;
