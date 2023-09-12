

import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, FormGroup, Label, Input, Button, Image } from 'react-bootstrap';
import Sidebar from './../sidebar/Sidebar';
import './CandidateDetails.css';
import logo from '../assets/Images/logo.svg';
import profile from '../assets/Images/profile.svg';
import back from '../assets/Images/back.svg';
import lock from '../assets/Images/lock.svg';
import map from '../assets/Images/map.svg';
import mail from '../assets/Images/mail.svg';
import phone from '../assets/Images/phone.svg';
import { useNavigate } from 'react-router-dom';
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
  let navigate = useNavigate();
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
          <div className='backimg mb-2' onClick={()=>navigate('/listofcandidate')}>
            <Image src={back} alt="Image"  className='backcss mx-2' />
            Back to candidate list
          </div>

          <Row>
            <Col md={5} >
              <Card >
                <Card.Body>
                  <div class="profile-image1">
                    <Image src={profile} alt="Image" className='profileimg  my-10' />

                  </div>
                  <div className='usernamecss'>
                    <span className='Namecss'>Joey M.</span>
                    <span className='profile'> <Image src={lock} alt="Image" className='otherimage' />
                      Software engineer at Zem</span>
                    <span className='profile'> <Image src={map} alt="Image" className='location' />
                      San Francisco, CA</span></div>

                  <div className='score'><span className='scoretext'>9 out of 10 skills match </span></div>
                  <div className='contactDetails '><span className='Namecss mb-3'>Contact Details</span>
                    <span className='profile mb-3'><Image src={mail} alt="Image" className='otherimage' />joeym@gamil.com</span>
                    <span className='profile'><Image src={phone} alt="Image" className='otherimage' />6123359867</span></div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={7}>
              <Card >
                <Card.Header className='profileDetail'>Profile Details</Card.Header>
                <Card.Body>
                  <Row className='rowborder'>
                    
                    <span className='Namecss mb-2'>About</span>
                    <span className='profile mb-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur. Excepteur sint occaecatcupidatat non proident.</span>
                   
                  </Row>
                  <Row className='rowborder'>
                  <span className='Namecss mb-2 mt-2'>Experiences</span>
                    
                   <span className='devcss'> Senior software developer at Zem</span>
                   <span className='devtext mb-2'>Oct 2021 - April 2023 (1 year 6 months)</span>
                   <span className='devcss'>Software developer at Neutech</span>
                   <span className='devtext mb-3'> April 2018 - Sep 2021 (3 year 5 months)</span>
                  </Row>
                  <Row className='rowborder'>
                  <span className='Namecss mb-2 mt-2'>Education</span>
                    
                  <span className='devcss'> University of California</span>
                  <span className='devtext'> Bachelor of engineering (Information Technology)</span>
                  <span className='devtext mb-2'> 2013 - 2017</span>
                  </Row>
                  <Row className='rowborder'>
                  <span className='Namecss mb-2 mt-2'>Certificates</span>
                    
                  <span className='devcss'> Certified full stack developer</span>
                    <span className='devtext mb-2'>  Issued Jan 2018</span>
                  </Row>
                  <Row >
                  <span className='Namecss mb-2 mt-2'>Skills</span>
                    
                    <span className='skills'>React native</span>
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

