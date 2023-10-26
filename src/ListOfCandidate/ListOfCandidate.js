

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Container, Row, Col, Form, FormGroup, Label, Input, Button, Image, Table } from 'react-bootstrap';
import Sidebar from './../sidebar/Sidebar';
import './ListOfCandidate.css';
import logo from '../assets/Images/logo.svg';
import profile from '../assets/Images/profile.svg';
import back from '../assets/Images/back.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../redux/authSlice';
import logout1 from '../assets/Images/logout.svg'
import home from '../assets/Images/home.svg'
import search from '../assets/Images/search1.svg'
import book from '../assets/Images/book.svg'
const ListOfCandidate = () => {
  let navigate = useNavigate();
  const [displayedData, setDisplayedData] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [next1, setnext1] = useState('');
  const [previous, setprevious] = useState('');
  const [loading, setLoading] = useState(false);
  const [userdata,setuserdata]=useState([])

  const location = useLocation();
  const data = location.state?.candidatedata || [];
  const trsncriptiondata = location.state?.trsncriptiondata || [];
  const userdata1 = location.state?.userdata || [];
  
  useEffect(() => {
    setuserdata(userdata1)
    setCandidate(data);
    setDisplayedData(data.results);
    setnext1(data.next_page)
    setprevious(data.previous_page)
  }, []);

  const [jobTitle, setjobTitle] = useState('');
  const [skill, setskill] = useState('');
  const [location1, setlocation] = useState('');
  const [industry, setIndustry] = useState('');

  useEffect(() => {

    if (trsncriptiondata) {
      setjobTitle(trsncriptiondata?.data?.experience_title)
      setskill(trsncriptiondata?.data?.keyword)
      setlocation(trsncriptiondata?.data?.location)
      setIndustry(trsncriptiondata?.data?.experience_company_industry)
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

    list.data.experience_title = jobTitle;
    list.data.keyword = skill ;
    list.data.location = location1;
    list.data.experience_company_industry = industry;

    setLoading(true)
    axios
      .post('https://flat-star-41744.botics.co/profile/final/?page=1&page_size=5', JSON.stringify(list.data), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        },
      })
      .then((response) => {
        setLoading(false)
        setCandidate(response.data);
        console.log('Audio sent to backend final:', response.data.results);
        setDisplayedData(response.data.results)
        setnext1(response.data.next_page)
        setprevious(response.data.previous_page)

      })
      .catch((error) => {
        console.error('Error sending audio to backend:', error);

      });
  }

  function onCandidateClick(editid) {

    list.data.experience_title = jobTitle;
    list.data.keyword = skill ;
    list.data.location = location1;
    list.data.experience_company_industry = industry;


    const dispdata = displayedData.filter((d) => d.candidate_id == editid);
    navigate(`/candidatedetails/${editid}`, {
      state: {
        candidatedata: dispdata,
        candidate:candidate,
        trsncriptiondata:list,
        userdata:userdata  
        
      }
    })
  }
  function nextbuttonCLick() {
    setLoading(true)

    list.data.experience_title = jobTitle;
    list.data.keyword = skill ;
    list.data.location = location1;
    list.data.experience_company_industry = industry;

    axios
    .post(next1, JSON.stringify(list.data), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${localStorage.getItem('token')}`
      },
    })
    .then((response) => {
      setLoading(false)
      console.log('Audio sent to backend final:', response.data.results);
      setDisplayedData(response.data.results)
      setnext1(response.data.next_page)
      setprevious(response.data.previous_page)


    })
    .catch((error) => {
      console.error('Error sending audio to backend:', error);

    });

  }

  function previousbuttonCLick() {
    setLoading(true)
    list.data.experience_title = jobTitle;
    list.data.keyword = skill ;
    list.data.location = location1;
    list.data.experience_company_industry = industry;

    axios
      .post(previous, JSON.stringify(list.data), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${localStorage.getItem('token')}`
        },
      })
      .then((response) => {
        setLoading(false)
        console.log('Audio sent to backend final:', response.data.results);
        setDisplayedData(response.data.results)
        setnext1(response.data.next_page)
        setprevious(response.data.previous_page)


      })
      .catch((error) => {
        console.error('Error sending audio to backend:', error);

      });
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

        <div onClick={onLogout} className="mt-auto logoutcss1" >
        <Image src={logout1}  onClick={onLogout}  className='navbarimg'  />
          Logout</div>
      </nav>
      <main className="main-content">
        <Container>
        {loading ? (
          <Loader />
        ) : (
          <div>
          </div>
        )}
          <Row>
            <Card >
              <Card.Body>
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
                    </tr>
                  </thead>
                  <tbody>
                    {displayedData?.map((item) => (
                      <tr key={item.candidate_id} onClick={() => onCandidateClick(item.candidate_id)} style={{ cursor: 'pointer' }}>
                        <td className='candidatenamecss'> <div class="profile-image">
                          <Image src={item.logo_url} alt="Image" className='profileimg' />

                        </div><div class="profile-name">
                            {item.candidate}<br></br>
                            {item.name}
                          </div></td>
                        <td style={{ width: '125px', textAlign: 'center' }}>
                          {item.experience_count} years
                        </td>
                        <td>{item.title}</td>
                        <td>{item.location}</td>
                      </tr>
                    ))}
                  </tbody>


                </Table>

                <div className="pagination">
                  <Button className='listbtncss mt-2' style={{ marginLeft: '10px' }} type="submit" disabled={next1 != '' && next1 != 'null' && next1 != undefined ? false : true} onClick={() => nextbuttonCLick()}>Next</Button>
                  <Button className='listbtncss mt-2' style={{ marginLeft: '10px' }} type="submit" disabled={previous != '' && previous != 'null' && previous != undefined ? false : true} onClick={() => previousbuttonCLick()} >Previous</Button>
                </div>
              </Card.Body>

            </Card>
          </Row>


        </Container>
      </main></>
  );
};

export default ListOfCandidate;

