

import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, FormGroup, Label, Input, Button, Image, Table } from 'react-bootstrap';
import Sidebar from './../sidebar/Sidebar';
import './ListOfCandidate.css';
import logo from '../assets/Images/logo.svg';
import profile from '../assets/Images/profile.svg';
import back from '../assets/Images/back.svg';
import { useNavigate, useLocation } from 'react-router-dom';
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
  let navigate = useNavigate();
  // const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [start, setStart] = useState(0);

  const location = useLocation();
  const data = location.state?.candidatedata || [];
  const userjson = location.state?.userjson || [];


  console.log(userjson, 'candidatedata')
  // useEffect(() => {
  //   // Simulate fetching data from an API
  //   // Replace this with your data-fetching logic
  //   const fetchData = async () => {
  //     // Simulating API call delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Assuming you have an array of data
  //     // const newData = Array.from({ length: data.length + rowsPerLoad }, (_, index) => ({
  //     //   id: index + 1,
  //     //   candidate: 'Joey M.',
  //     //   match: '9/10 ',
  //     //   skills: 'React.js',
  //     //   contact: 'joeym@gamil.com'
  //     // }));


  //     const newData = [
  //       {
  //         id: "AWB123456",
  //         candidate: 'Joey M.',
  //         match: '9/10',
  //         skills: 'React.js',
  //         contact: 'joeym@gamil.com'
  //       },
  //       {
  //         id: "AWB123456",
  //         candidate: 'Joey M.',
  //         match: '6/10',
  //         skills: 'React.js',
  //         contact: 'joeym@gamil.com'
  //       },
  //       {
  //         id: "AWB123456",
  //         candidate: 'Joey M.',
  //         match: '4/10',
  //         skills: 'React.js',
  //         contact: 'joeym@gamil.com'
  //       },


  //     ];

  //     setData(newData);
  //   };

  //   fetchData();
  // }, [data]);

  const getColorClass = (value) => {


    if (value > '6/10') {
      return 'green-text';
    } else if (value < '5/10') {
      return 'red-text';
    } else if (value >= '5/10' && value <= '6/10') {
      return 'yellow-text';
    } else {
      return ''; // No special class for values between 5 and 8
    }
  };
  useEffect(() => {
    // Update the displayedData based on start and rowsPerLoad
    setDisplayedData(data.slice(0, start + rowsPerLoad));
  }, [data, start]);

  const loadMoreRows = () => {
    setStart(start + rowsPerLoad);
  };

  const [jobTitle, setjobTitle] = useState('');
  const [skill, setskill] = useState('');
  const [location1, setlocation] = useState('');
  const [industry, setIndustry] = useState('');

  useEffect(() => {

    if (userjson) {
      setjobTitle(userjson?.openai_response?.experience_title)
      setskill(userjson?.openai_response?.skills_Required)
      setlocation(userjson?.openai_response?.job_location)
      setIndustry(userjson?.openai_response?.industry)
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
    'experience_title': '',
    'industry': '',
    'job_location': '',
    'skills_Required': ''
  }
  const onSearchClick = (event) => {
    event.preventDefault();


    list.experience_title = jobTitle;
    list.industry = industry;
    list.job_location = location1;
    list.skills_Required = skill;
  console.log(list,"list")
    // axios
    //   .post('https://flat-star-41744.botics.co/profile/final/', list, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'Authorization': `token ${localStorage.getItem('token')}`
    //     },
    //   })
    //   .then((response) => {
    //     console.log('Audio sent to backend:', response);
   

    //   })
    //   .catch((error) => {
    //     console.error('Error sending audio to backend:', error);
  
    //   });
  }

  return (
    <>
      <div className='headerlogo'>
        <Image src={logo} alt="Image" className='mainlogo' />
        {/* <div className='profileheader'>
          <div class="profile-image">
            <Image src={profile} alt="Image" className='profileimg' />

          </div>
          <div class="profile-name">
            Monica R.
          </div>
        </div> */}
      </div>
      <Sidebar />
      <main className="main-content">
        <Container>

          <Row>
            <Card >

              <Card.Body>
                {/* <div className={`number ${getColorClass()}`}>
      
    </div> */}
                <Card.Title className='cardtitle  m-0 p-0'>Transcription Name </Card.Title>
                <Form onSubmit={onSearchClick}>
                <Row className='mt-2'>
                  <Col className="col-search" lg={3}>

                    <FormGroup>
                      <Form.Label className="text-start">Job Title</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={jobTitle}
                        onChange={setjobTitle1}
                        className="custom-input listinput"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-search" lg={3}>
                    <FormGroup>
                      <Form.Label className="text-start">Skills Required</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={skill}
                        onChange={setskill1}
                        className="custom-input listinput"
                      />
                    </FormGroup>
                  </Col>

                  <Col className="col-search" lg={3}>
                    <FormGroup>
                      <Form.Label className="text-start">  Job location</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={location1}
                        onChange={setlocation1}
                        className="custom-input listinput"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="col-search" lg={3}>
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
                <Row>
                  <div className='candidatebtn'>
                    <Button className='listbtncss' type="submit">Search for Candidates</Button>
                  </div>
                </Row>
                </Form>
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
                      <th>Experience Count</th>
                      <th>Skills</th>
                      <th>Location</th>
                      {/* Add more header columns as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {displayedData.map((item) => (
                      <tr key={item.id} onClick={() => navigate(`/candidatedetails/${item.id}`)} style={{ cursor: 'pointer' }}>
                        <td className='candidatenamecss'> <div class="profile-image">
                          <Image src={item.logo_url} alt="Image" className='profileimg' />

                        </div><div class="profile-name">
                            {item.candidate}<br></br>
                            {item.name}
                          </div></td>
                        <td  style={{width:'125px',textAlign:'center'}}>
                         {item.experience_count} years
                        </td>
                        <td>{item.title}</td>
                        <td>{item.location}</td>
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

