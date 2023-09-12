

import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, FormGroup, Label, Input, Button, Image } from 'react-bootstrap';
import Sidebar from './../sidebar/Sidebar';
import './ListOfRequirements.css';
import logo from '../assets/Images/logo.svg';
import profile from '../assets/Images/profile.svg';
import back from '../assets/Images/back.svg';
import edit from '../assets/Images/edit.svg';

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


const ListOfRequirements = () => {
  const [inputText, setInputText] = useState('');
  const [show, setShow] = useState(true);
  const [hide, sethide] = useState(false);

  const onEditClick = () => {
    setShow(false)
    sethide(true)
  }

  const onCancelClick =() =>{
    setShow(true)
    sethide(false)
  }

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
        <Container>
          <div className='backimg'>
            <Image src={back} alt="Image" className='backcss mx-2' />
            Go to list
          </div>

          <Row>
            <Col md={6} >
              {/* Left side with description */}
              <Card >
                <Card.Body>
                  <Card.Title>Transcription Name <Image src={edit} onClick={() => onEditClick()} alt="Image" className='editimage' /></Card.Title>
                 {show && <div className="scrollable-text" >
                    {Array(100)
                      .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ')
                      .join('')}
                  </div>}
                    {hide && 
                  <div className="scrollable-text" >
                    <Form.Group controlId="exampleTextarea">
                      <Form.Control as="textarea"
                      defaultValue={Array(100)
                        .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ')
                        .join('')}
                      rows={100} placeholder="Enter text..." />
                    </Form.Group>
                    <div className='btnflex'>
            <Button className='listbtncss'>Save</Button>
            <Button className='listbtncss mx-2' onClick={() => onCancelClick()}>Cancel</Button>
          </div>
                    {/* {Array(100)
                      .fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ')
                      .join('')} */}
                  </div>}

                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Form>
                <FormGroup>
                  <Form.Label className="text-start">Job Title</Form.Label>
                  <CustomInput
                    value={inputText}
                    onChange={setInputText}
                    onClear={handleClearText}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label className="text-start">Experience level</Form.Label>
                  <CustomInput
                    value={inputText}
                    onChange={setInputText}
                    onClear={handleClearText}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label className="text-start"> Skills Required</Form.Label>
                  <CustomInput
                    value={inputText}
                    onChange={setInputText}
                    onClear={handleClearText}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label className="text-start">Job Type</Form.Label>
                  <CustomInput
                    value={inputText}
                    onChange={setInputText}
                    onClear={handleClearText}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label className="text-start"> Job Location</Form.Label>
                  <CustomInput
                    value={inputText}
                    onChange={setInputText}
                    onClear={handleClearText}
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label className="text-start"> Industry</Form.Label>
                  <CustomInput
                    value={inputText}
                    onChange={setInputText}
                    onClear={handleClearText}
                  />
                </FormGroup>
                <FormGroup>
                  <Form.Label className="text-start"> Educational Background</Form.Label>
                  <CustomInput
                    value={inputText}
                    onChange={setInputText}
                    onClear={handleClearText}
                  />
                </FormGroup>
                <FormGroup>
                  <Form.Label className="text-start">Salary Range</Form.Label>
                  <CustomInput
                    value={inputText}
                    onChange={setInputText}
                    onClear={handleClearText}
                  />
                </FormGroup>


              </Form>
            </Col>
          </Row>


          <div className='btnflex'>
            <Button className='listbtncss'>Search for Candidates</Button>
          </div>
        </Container>
      </main></>
  );
};

export default ListOfRequirements;
