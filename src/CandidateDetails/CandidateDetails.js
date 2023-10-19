

import React, { useState,useEffect } from 'react';
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
import { useNavigate,useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CandidateDetails = () => {
  let navigate = useNavigate();
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
  const { id } = useParams();
  console.log(id,"id")
  const [data, setdata] = useState('');
  useEffect(() => {

   const data =jsondata.filter((d)=>d.id == id);
   console.log(data,"data")
   setdata(data[0]);
 
  }, []);

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
                    <Image src={data?.logo_url} alt="Image" className='profileimg  my-10' />

                  </div>
                  <div className='usernamecss'>
                    <span className='Namecss'>{data?.name}</span>
                    <span className='profile' style={{marginTop:10}}> <Image src={lock} alt="Image" className='otherimage' />
                      {data?.title}</span>
                    <span className='profile' style={{marginTop:6}}> <Image src={map} alt="Image" className='location' />
                    {data?.location}</span></div>

                  {/* <div className='score'><span className='scoretext'>9 out of 10 skills match </span></div>
                  <div className='contactDetails '><span className='Namecss mb-3'>Contact Details</span>
                    <span className='profile mb-3'><Image src={mail} alt="Image" className='otherimage' />joeym@gamil.com</span>
                    <span className='profile'><Image src={phone} alt="Image" className='otherimage' />6123359867</span></div> */}
                </Card.Body>
              </Card>
            </Col>
            <Col md={7}>
              <Card >
                <Card.Header className='profileDetail'>Profile Details</Card.Header>
                <Card.Body>
                  <Row className='rowborder'>
                    
                    <span className='Namecss mb-2'>About</span>
                    <span className='profile mb-3'>
                     {data?.summery}
                    </span>
                   
                  </Row>
                  <Row className='rowborder'>
                  <span className='Namecss mb-2 mt-2'>Experience</span>
                    
                   {/* <span className='devcss'> Senior software developer at Zem</span> */}
                   <span className='devtext mb-2'>{data?.experience_count} years</span>
                  </Row>
                  <Row className='rowborder'>
                  <span className='Namecss mb-2 mt-2'>LinkedIn URL</span>
                  <a className='devcss' href={data?.url} target='_blank'  style={{cursor:'pointer'}}>{data?.url}</a>
                  {/* <span className='devcss'> University of California</span>
                  <span className='devtext'> Bachelor of engineering (Information Technology)</span>
                  <span className='devtext mb-2'> 2013 - 2017</span> */}
                  </Row>
                  {/* <Row className='rowborder'>
                  <span className='Namecss mb-2 mt-2'>Certificates</span>
                    
                  <span className='devcss'> Certified full stack developer</span>
                    <span className='devtext mb-2'>  Issued Jan 2018</span>
                  </Row> */}
                  <Row >
                  <span className='Namecss mb-2 mt-2'>Skills</span>
                    
                    <span className='skills'>{data?.title}</span>
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

