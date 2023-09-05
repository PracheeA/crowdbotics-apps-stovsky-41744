

import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, FormGroup, Label, Input, Button, Image } from 'react-bootstrap';
import Sidebar from './../sidebar/Sidebar';
import './CandidateDetails.css';
import logo from '../assets/Images/logo.svg';
import profile from '../assets/Images/profile.svg';
import back from '../assets/Images/back.svg';

const CustomInput = ({ value, onChange, onClear }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <>
      <div className="input-container">
        <div className="input-wrapper">
          <Form.Control
            type="text"
            value={value}
            onChange={handleChange}
            className="custom-input listinput"
          />
          {value && (
            <span className="clear-icon" onClick={onClear}>
              &times;
            </span>
          )}
        </div>
      </div>

    </>
  );
}
const CandidateDetails = () => {
  const [inputText, setInputText] = useState('');

  const handleClearText = () => {
    setInputText('');
  };
  return (
    <>
      <div className='headerlogo'>
        <Image src={logo} alt="Image" className='mainlogo' />
        <div className='profileheader'>
          <div class="profile-image">
            <Image src={profile} alt="Image" className='profileimg' />

          </div>
          <div class="profile-name">
            Monica R.
          </div>
        </div>
      </div>
      <Sidebar />
      <main className="main-content">
        <Container className='candidateDetails'>
          <div className='backimg mb-2'>
            <Image src={back} alt="Image" className='backcss mx-2' />
            Back to candidate list
          </div>

          <Row>
            <Col md={6} >
              <Card >
                <Card.Body>
                  <div class="profile-image1">
                    <Image src={profile} alt="Image" className='profileimg  my-10' />

                  </div>
<span>Joey M.</span><br></br>
<span>Software engineer at Zem</span><br></br>
<span>San Francisco, CA</span><br></br>
<span>9 out of 10 skills match </span><br></br>
<span>Contact Details</span><br></br>
joeym@gamil.com<br></br>
<span>6123359867</span>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
            <Card >
              <Card.Header>Profile Details</Card.Header>
                <Card.Body>
                  <Row>
                  About<br></br>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
 incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis 
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore 
eu fugiat nulla pariatur. Excepteur sint occaecatcupidatat non proident.
                  </Row>
                  <Row>
                  Experiences
                  Senior software developer at Zem
                  Oct 2021 - April 2023 (1 year 6 months)
                  Software developer at Neutech
                  April 2018 - Sep 2021 (3 year 5 months)
                  </Row>
                  <Row>
                  Education
                  University of California 
                  Bachelor of engineering (Information Technology)
                  2013 - 2017
                  </Row>
                  <Row>
                  Certificates
                  Certified full stack developer
                  Issued Jan 2018
                  </Row>
                  <Row>
                  Skills
                  React native
                  </Row>
                </Card.Body>
                </Card>
            </Col>
          </Row>
         
        </Container>
      </main></>
  );
};

export default CandidateDetails;

