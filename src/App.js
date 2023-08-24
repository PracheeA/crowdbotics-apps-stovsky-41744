import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link, Redirect } from 'react-router-dom'
import ForgetPassword from './forgetPassword/forgetPassword';
import StartStop from './StartStop/StartStop';
import { Button, Image, Modal, Form, Row, Col } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundimg from './assets/Images/background.svg';
import start from './assets/Images/start.svg';
import stop from './assets/Images/stop.svg';
import React, { useState, useEffect } from 'react';
import RecordRTC from 'recordrtc';

function App() {

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  };


  ///recording

  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

        const newRecorder = new RecordRTC(stream, {
          type: 'audio',
        });
        newRecorder.startRecording();

        setMediaStream(stream);
        setRecorder(newRecorder);
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    };

    const stopRecording = () => {
      if (recorder) {
        recorder.stopRecording(() => {
          const blob = recorder.getBlob();
          setRecordedBlob(blob);
          setIsRecording(false);

          if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
          }
        });
      }
    };

    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);


  return (
    <div className="App">
      <Router>
        <Routes>

          {/* <Route exact path='/' element={<ForgetPassword />} /> */}
          {/* <Route exact path='/' element={<StartStop/>} /> */}
        </Routes>
      </Router>

      <Card text="white" style={{ width: '27rem', background: '#799ACC' }}>

        <Card.Body >
          <Card bg="white" text="dark" className='cardheader p-2'>
            <div>Search candidate</div>
            <div>Subscribe</div>
            <div>Logout</div>
          </Card><br></br>

          <Card bg="white" text="dark" className='p-2 '>
            <div className='cardBody'><Card.Title className='cardTitle'>Stovsky</Card.Title>
              <span className='textcss'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore. Lorem</span> </div>
            <a href='https://www.w3schools.com/' target="_blank">test</a>
            <Button className='my-2 mx-5 cardbtn' onClick={() => setShow(true)} ><Image src={start} className="editimage px-2" />Start Recording</Button>
            <Button className='my-2 mx-5 stopButton' ><Image src={stop} className="editimage px-2" />Stop recording</Button>
            <button onClick={() => setIsRecording(prevState => !prevState)}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {recordedBlob && (
              <audio controls src={URL.createObjectURL(recordedBlob)} />
            )}
          </Card>
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose} centered size="xl" className='modalnotification'>
        <Modal.Header
          closeButton
          style={{ color: "#fff", backgroundColor: "rgba(121, 154, 204, 1)" }}
        >
          <Modal.Title className="px-2 py-2">Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Row className="mt-2 textrow" >

              <span className='modalheader'>Do you want to start recording? </span> <br></br>

              <span className='textcss px-5'>    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore. Lorem </span>

            </Row>
            <div className='btnflex'>
              <Button type="submit" className="px-5 py-1 mx-2  mt-3" style={{ borderRadius: "5px", backgroundColor: "rgba(52, 168, 83, 1)", color: "#fff" }} variant="secondary" >
                Start
              </Button>


              <Button type="submit" className="px-5 py-1  mt-3" style={{ borderRadius: "5px", backgroundColor: "rgba(255, 48, 47, 1)", color: "#fff" }} variant="secondary" >
                Cancel
              </Button></div>
          </Form>
        </Modal.Body>
      </Modal>


    </div>
  );
}

export default App;
