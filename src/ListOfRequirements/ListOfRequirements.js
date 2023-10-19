

import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, FormGroup, Label, Input, Button, Image } from 'react-bootstrap';
import Sidebar from './../sidebar/Sidebar';
import './ListOfRequirements.css';
import logo from '../assets/Images/logo.svg';
import profile from '../assets/Images/profile.svg';
import back from '../assets/Images/back.svg';
import edit from '../assets/Images/edit.svg';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

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
    'experience_title': '',
    'industry': '',
    'job_location': '',
    'skills_Required': ''
  }

  const jsondata=[{

    "id": 89987036,

    "name": "Ivan Bogomolov",

    "first_name": null,

    "last_name": null,

    "title": "Backend dev",

    "url": "https://www.linkedin.com/in/ivan-bogomolov-1642a579",

    "location": "Moscow, Moscow, Russia",

    "industry": "Information Technology & Services",

    "summery": null,

    "logo_url": "https://static-exp1.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry",

    "country": "Russia",

    "experience_count": 7

},

{

    "id": 41507698,

    "name": "Egor Guriyanov",

    "first_name": "Egor",

    "last_name": "Guriyanov",

    "title": "Principal CEO at Self-employed IT developing master Jedi, front/back end, DEV-ops and much more.",

    "url": "https://www.linkedin.com/in/egorlaw",

    "location": "Moscow, Moscow, Russia",

    "industry": "Information Technology & Services",

    "summery": "I'm a full-stack programmer that is really into the clean coding style and standardisation of everything if possible. So basically for the personal motto we can simply adopt:\n\n\"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live\"\n- John Woods",

    "logo_url": "https://media.licdn.com/dms/image/C5103AQFQDewTpkYa_Q/profile-displayphoto-shrink_800_800/0/1516469456580?e=2147483647&v=beta&t=XK_qrDws3A22c6CjG-R1HVAo_E2N6LKqIwdgZqJcJi0",

    "country": "Russia",

    "experience_count": 5

},

{

    "id": 130009270,

    "name": "Dmitry Malugin",

    "first_name": "Dmitry",

    "last_name": "Malugin",

    "title": "Javascript Developer",

    "url": "https://www.linkedin.com/in/dmitry-malugin-7a308bb",

    "location": "Moscow, Moscow, Russia",

    "industry": "Research",

    "summery": "Experienced Client Side Developer with a history of working in the research industry. Skilled in JavaScript, and Python. Strong engineering professional with a passion to learn new things and technologies.",

    "logo_url": "https://media.licdn.com/dms/image/C4E03AQFKwIx2rDWYPg/profile-displayphoto-shrink_800_800/0/1516350589933?e=2147483647&v=beta&t=R-Jg-ZSDRY85IKjbWy0Q6v7lOs9PABVTKP2lHjY6ZCM",

    "country": "Russia",

    "experience_count": 9

},

{

    "id": 7113142,

    "name": "Yaroslav Korchevsky",

    "first_name": null,

    "last_name": null,

    "title": "Full Stack  Node/React/Angular, React Native, WebRTC, AR Developer (Remote Work)",

    "url": "https://www.linkedin.com/in/yaroslav-korchevsky-7776972",

    "location": "Solnechnogorsk, Moscow, Russia",

    "industry": "Computer Software",

    "summery": "<p>I have strong experience with Angular2+, React.js, vue, Node.js, PHP,  React Native Mobile app development and Video/Audio call using WebRTC, Socket.io. so I have enough experiences with AR, AI/Machine learning, Computer vision as well.<br>skype ID:  live:.cid.d6cd22efcc702330<br>telegram: +7 926 675 07 56 (@slavprodev)<br>whatsapp: +79266750756<br>My Top skills and experience<br>1) Web Development<br>-PHP, Node.js, Angular 2~7, React, Redux, Vue, GraphQL, WebGL/Three.js<br>2)Native and Hybrid Mobile App development<br>-Swift, Java, React Native, Ionic<br>3) Other Skills<br>-version control: Git Flow, Bitbucket, Jira, Trello<br>-Excellent verbal and written communication</p>",

    "logo_url": "https://static-exp1.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry",

    "country": "Russia",

    "experience_count": 13

}

]

  const onSearchClick = (event) => {
    event.preventDefault();

    navigate(
      '/listofcandidate',
      {
        state: {
          candidatedata:jsondata,
          userjson:userdata
        }
      }
    )

    list.experience_title = jobTitle;
    list.industry = industry;
    list.job_location = location1;
    list.skills_Required = skill;
  
    // axios
    //   .post('https://flat-star-41744.botics.co/profile/final/', list, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'Authorization': `token ${localStorage.getItem('token')}`
    //     },
    //   })
    //   .then((response) => {
    //     console.log('Audio sent to backend:', response);
    //     navigate(
    //       '/listofrequirements',
    //       {
    //         state: {
    //           candidatedata:jsondata
    //         }
    //       }
    //     )

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
          <div className='backimg'>
            <Image src={back} alt="Image" className='backcss mx-2' />
            Go to list
          </div>
          <Form onSubmit={onSearchClick}>
            <Row>

              <Col md={6} >
                {/* Left side with description */}
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
