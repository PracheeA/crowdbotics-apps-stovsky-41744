

import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, FormGroup, Label, Input, Button, Image, Table } from 'react-bootstrap';
import Sidebar from './../sidebar/Sidebar';
import './ListOfCandidate.css';
import logo from '../assets/Images/logo.svg';
import profile from '../assets/Images/profile.svg';
import back from '../assets/Images/back.svg';
const rowsPerLoad = 5;
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
const ListOfCandidate = () => {
  const [inputText, setInputText] = useState('');

  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [start, setStart] = useState(0);
  useEffect(() => {
    // Simulate fetching data from an API
    // Replace this with your data-fetching logic
    const fetchData = async () => {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Assuming you have an array of data
      const newData = Array.from({ length: data.length + rowsPerLoad }, (_, index) => ({
        id: index + 1,
        candidate: 'Joey M.',
        match: '9/10 ',
        skills: 'React.js',
        contact: 'joeym@gamil.com'
        // Add more columns as needed
      }));

      setData(newData);
    };

    fetchData();
  }, [data]);
  useEffect(() => {
    // Update the displayedData based on start and rowsPerLoad
    setDisplayedData(data.slice(0, start + rowsPerLoad));
  }, [data, start]);

  const loadMoreRows = () => {
    setStart(start + rowsPerLoad);
  };

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

          <Row>
            <Card >

              <Card.Body>
              <Card.Title className='cardtitle  m-0 p-0'>Transcription Name </Card.Title>
                <Row className='mt-2'>
                <Col className="col-search" lg={2}>
                 
                  <FormGroup>
                    <Form.Label className="text-start">Job Title</Form.Label>
                    <CustomInput
                      value={inputText}
                      onChange={setInputText}
                      onClear={handleClearText}
                    />
                  </FormGroup>
                  </Col>
                  <Col className="col-search" lg={2}>
                  <FormGroup>
                    <Form.Label className="text-start">Experience level</Form.Label>
                    <CustomInput
                      value={inputText}
                      onChange={setInputText}
                      onClear={handleClearText}
                    />
                  </FormGroup>
                  </Col>
                  <Col className="col-search" lg={2}>
                  <FormGroup>
                    <Form.Label className="text-start">Skills Required</Form.Label>
                    <CustomInput
                      value={inputText}
                      onChange={setInputText}
                      onClear={handleClearText}
                    />
                  </FormGroup>
                  </Col>
                  <Col className="col-search" lg={2}>
                  <FormGroup>
                    <Form.Label className="text-start"> Job Type</Form.Label>
                    <CustomInput
                      value={inputText}
                      onChange={setInputText}
                      onClear={handleClearText}
                    />
                  </FormGroup>
                  </Col>
                 
                </Row>
                <Row>
                <Col className="col-search" lg={2}>
                  <FormGroup>
                    <Form.Label className="text-start">  Job location</Form.Label>
                    <CustomInput
                      value={inputText}
                      onChange={setInputText}
                      onClear={handleClearText}
                    />
                  </FormGroup>
                  </Col>
                <Col className="col-search" lg={2}>
                  <FormGroup>
                    <Form.Label className="text-start"> Industry</Form.Label>
                    <CustomInput
                      value={inputText}
                      onChange={setInputText}
                      onClear={handleClearText}
                    />
                  </FormGroup>
                  </Col>
                  <Col className="col-search" lg={3}>
                  <FormGroup>
                    <Form.Label className="text-start"> Educational Background</Form.Label>
                    <CustomInput
                      value={inputText}
                      onChange={setInputText}
                      onClear={handleClearText}
                    />
                  </FormGroup>
                  </Col>
                  <Col className="col-search" lg={3}>
                  <FormGroup>
                    <Form.Label className="text-start">  Salary Range</Form.Label>
                    <CustomInput
                      value={inputText}
                      onChange={setInputText}
                      onClear={handleClearText}
                    />
                  </FormGroup>
                  </Col>
                 
                </Row>
                <Row>
                <div className='candidatebtn'>
            <Button className='listbtncss'>Search for Candidates</Button>
          </div>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <Row className='mt-2'>
            <Card >
              <Card.Body>
                <Table className='candidateTable'>
                  <thead>
                    <tr>
                      <th >Candidate</th>
                      <th>Match</th>
                      <th>Skills</th>
                      <th>Contact</th>
                      {/* Add more header columns as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {displayedData.map((item) => (
                      <tr key={item.id}>
                        <td className='candidatenamecss'> <div class="profile-image">
            <Image src={profile} alt="Image" className='profileimg' />

          </div><div class="profile-name">
          {item.candidate}<br></br>
          {"Software engineer at Zem"}
          </div></td>
                        <td>{item.match}</td>
                        <td>{item.skills}</td>
                        <td>{item.contact}</td>
                        {/* Render additional data columns here */}
                      </tr>
                    ))}
                  </tbody>


                </Table>
                {start + rowsPerLoad < data.length && (
                  <span className='loadmore' onClick={loadMoreRows}>
                    Load More
                  </span>
                )}
              </Card.Body>

            </Card>
          </Row>

         
        </Container>
      </main></>
  );
};

export default ListOfCandidate;

