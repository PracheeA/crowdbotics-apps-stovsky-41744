

import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, FormGroup,  Button, Image } from 'react-bootstrap';
import Sidebar from './../sidebar/Sidebar';
import './ListOfRequirements.css';
import logo from '../assets/Images/logo.svg';
import edit from '../assets/Images/edit.svg';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../Loader';

const ListOfRequirements = () => {
  const [inputText, setInputText] = useState('');
  const [show, setShow] = useState(true);
  const [hide, sethide] = useState(false);
  let navigate = useNavigate();


  const location = useLocation();
  const userdata = location.state?.userdata || [];
  const [jobTitle, setjobTitle] = useState('');
  const [skill, setskill] = useState('');
  const [location1, setlocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  const onEditClick = () => {
    setShow(false)
    sethide(true)
  }
  const onCancelClick = () => {
    setShow(true)
    sethide(false)
  }
  useEffect(() => {
    console.log(userdata, "userdata")
    setData(userdata)
    if (userdata) {
      setjobTitle(userdata?.openai_response?.experience_title)
      setskill(userdata?.openai_response?.skills_Required)
      setlocation(userdata?.openai_response?.job_location)
      setIndustry(userdata?.openai_response?.industry)
    }
  }, []);


  const setlocation1 = (event) => {
    setlocation(event.target.value);
  };
  const setjobTitle1 = (event) => {
    setjobTitle(event.target.value);
  };

  const setskill1 = (event) => {
    setskill(event.target.value);
  };

  const setIndustry1 = (event) => {
    setIndustry(event.target.value);
  };


  let list = {
    "data": {
      "experience_title": "",
      "keyword": "",
      "location": "",
      "experience_company_industry": ""
    },
  }

  const onSearchClick = (event) => {
    event.preventDefault();
    setLoading(true)

    list.data.experience_title = jobTitle;
    list.data.keyword = skill ;
    list.data.location = location1;
    list.data.experience_company_industry = industry;

    axios
      .post('https://flat-star-41744.botics.co/profile/final/?page=1&page_size=5', JSON.stringify(list.data), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        },
      })
      .then((response) => {
        console.log('Audio sent to backend final:', response.data.results);
        setLoading(false)
        navigate(
          '/listofcandidate',
          {
            state: {
              candidatedata: response.data,
              trsncriptiondata: list,
              userdata:data
            }
          }
        )

      })
      .catch((error) => {
        console.error('Error sending audio to backend:', error);

      });
  }
 

  return (
    <>
      <div className='headerlogo'>
        <Image src={logo} alt="Image" className='mainlogo' />
       
      </div>
      <Sidebar />

      <main className="main-content">
        <Container>
        {loading ? (
          <Loader />
        ) : (
          <div>
            
          </div>
        )}
          <Form onSubmit={onSearchClick}>
            <Row>
              <Col md={6} >
                <Card >
                  <Card.Body>
                    <Card.Title>Transcription Name <Image src={edit} onClick={() => onEditClick()} alt="Image" className='editimage' /></Card.Title>
                    {show && <div className="scrollable-text" >
                      {userdata.transcribed_text}
                    </div>}
                    {hide &&
                      <div className="scrollable-text" >
                        <Form.Group controlId="exampleTextarea">
                          <Form.Control as="textarea"
                            defaultValue={userdata.transcribed_text}
                            rows={100} placeholder="Enter text..." />
                        </Form.Group>
                        <div className='btnflex'>
                          <Button className='listbtncss'>Save</Button>
                          <Button className='listbtncss mx-2' onClick={() => onCancelClick()}>Cancel</Button>
                        </div>
                      </div>}

                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>

                <FormGroup>
                  <Form.Label className="text-start">Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={jobTitle}
                    onChange={setjobTitle1}
                    className="custom-input listinput"
                  />
                </FormGroup>
                <FormGroup>
                  <Form.Label className="text-start"> Skills Required</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={skill}
                    onChange={setskill1}
                    className="custom-input listinput"
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label className="text-start"> Job Location</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={location1}
                    onChange={setlocation1}
                    className="custom-input listinput"
                  />
                </FormGroup>

                <FormGroup>
                  <Form.Label className="text-start"> Industry</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={industry}
                    onChange={setIndustry1}
                    className="custom-input listinput"
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className='btnflex'>
              <Button className='listbtncss' type="submit">Search for Candidates</Button>
            </div>
          </Form>


        </Container>
      </main></>
  );
};

export default ListOfRequirements;
