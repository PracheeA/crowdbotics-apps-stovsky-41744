/*global chrome*/
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ForgetPassword from './forgetPassword/forgetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Login from './login/login';
import AudioRecorder from "./AudioRecorder";
import Sidebar from './sidebar/Sidebar';
import Forgetpasschange from './forgetPassword/forgetpasschange';
import ListOfRequirements from './ListOfRequirements/ListOfRequirements';
import ListOfCandidate from './ListOfCandidate/ListOfCandidate';
import CandidateDetails from './CandidateDetails/CandidateDetails';
function App() {


  useEffect(() => {

    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
   
      const data = localStorage.getItem('token')
      chrome.runtime.sendMessage({
        action: 'my-action',
        data,
      });

    } else {
      // You're not in a Chrome extension context
      console.warn('chrome.runtime.sendMessage is not available in this environment.');
    }


  })

  return (
    <div className="App">

      <Router>
        <Routes>

          <Route exact path='/' element={<Login />} />
          <Route exact path='/forgetpassword' element={<ForgetPassword />} />
          <Route exact path='/sidebar' element={<Sidebar />} />
          <Route exact path='/listofrequirements' element={<ListOfRequirements />} />
          <Route exact path='/listofcandidate' element={<ListOfCandidate />} />
          <Route exact path='/candidatedetails/:id' element={<CandidateDetails />} />
          <Route exact path='/recording' element={<AudioRecorder />} />

          <Route exact path='/resetPassword' element={< Forgetpasschange />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
