

import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col,  Image } from 'react-bootstrap';
import Sidebar from './../sidebar/Sidebar';
import './CandidateDetails.css';
import logo from '../assets/Images/logo.svg';
import back from '../assets/Images/back.svg';
import lock from '../assets/Images/lock.svg';
import map from '../assets/Images/map.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux"
import { logout } from '../redux/authSlice';
import logout1 from '../assets/Images/logout.svg'
import home from '../assets/Images/home.svg'
import search from '../assets/Images/search1.svg'
import book from '../assets/Images/book.svg'
const CandidateDetails = () => {
  let navigate = useNavigate();

  const location = useLocation();
  const userjson = location.state?.candidatedata || [];
  const candidate = location.state?.candidate || [];
  const trsncriptiondata1 = location.state?.trsncriptiondata || [];
  const userdata1 = location.state?.userdata || [];
console.log(candidate,'candidate')
console.log(trsncriptiondata1,'trsncriptiondata1')
  // candidate
  const [userdata,setuserdata]=useState([])

  const { id } = useParams();
  const [data, setdata] = useState('');
  const [candidatedata, setcandidatedata] = useState('');
  const [trsncriptiondata, settrsncriptiondata] = useState('');
  useEffect(() => {
    setuserdata(userdata1)
    setcandidatedata(candidate)
    settrsncriptiondata(trsncriptiondata1)
    setdata(userjson[0]);

  }, []);

  
  function candidateback() {
    console.log(candidatedata,"candidatedata")
    console.log(trsncriptiondata,"trsncriptiondata1")
    navigate('/listofcandidate', {
      state: {
        candidatedata: candidatedata,
        trsncriptiondata:trsncriptiondata  
        
      }
    })
  }
  const [activeMenuItem, setActiveMenuItem] = useState();
  const dispatch = useDispatch()
  // Function to handle menu item clicks
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    const menunavigate='/'+ menuItem;
    navigate(menunavigate)
  };

  const onLogout = () => {
    navigate('/')
    dispatch(logout())
   
  }


  function transcribeData() {
 
    navigate(`/listofrequirements`, {
      state: {
        userdata: userdata,
      }
    })
  }
  return (
    <>
      <div className='headerlogo'>
        <Image src={logo} alt="Image" className='mainlogo' />
      </div>
      <nav className="sidebar">
        <ul>
        {/* <li className='sidebarTitle p-4'>Stovsky</li> */}
          <li
            className={`${(activeMenuItem == "Home") ? 'active' : ''} py-3 `}
            onClick={() => handleMenuItemClick('listofrequirements')}
          >
             <Image src={home}  className='navbarimg'  />
            Home
          </li>
          <li
          className={`${(activeMenuItem == "listofcandidate") ? 'active' : ''} py-3 `}
            onClick={() => handleMenuItemClick('listofcandidate')}
          >
            <Image src={search}  className='navbarimg'  />
            Search Candidates
          </li>
          <li
           className={`${(activeMenuItem == "listofrequirements") ? 'active' : ''} py-3 `}
            onClick={() => transcribeData()}
          ><Image src={book}  className='navbarimg'  />
           Transcribed Data
          </li>
          
        </ul>

        <div onClick={onLogout} className="mt-auto logoutcss1">
        <Image src={logout1}  onClick={onLogout}  className='navbarimg'  />
          Logout</div>
      </nav>
      <main className="main-content">
        <Container className='candidateDetails'>
          <div className='backimg mb-2' onClick={() => candidateback()}>
            <Image src={back} alt="Image" className='backcss mx-2'  />
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
                    <span className='profile' style={{ marginTop: 10 }}> <Image src={lock} alt="Image" className='otherimage' />
                      {data?.title}</span>
                    <span className='profile' style={{ marginTop: 6 }}> <Image src={map} alt="Image" className='location' />
                      {data?.location}</span></div>
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
                      {data?.summary}
                    </span>

                  </Row>
                  <Row className='rowborder'>
                    <span className='Namecss mb-2 mt-2'>Experience</span>

                    <span className='devtext mb-2'>{data?.experience_count} years</span>
                  </Row>
                  <Row className='rowborder'>
                    <span className='Namecss mb-2 mt-2'>LinkedIn URL</span>
                    <a className='devcss' href={data?.url} target='_blank' style={{ cursor: 'pointer' }}>{data?.url}</a>
                   
                  </Row>
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

