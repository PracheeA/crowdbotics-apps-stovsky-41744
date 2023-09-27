import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Image } from 'react-bootstrap';
import logo from './assets/Images/logo.svg';
import { useNavigate } from 'react-router-dom';

const AudioRecorder = () => {
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);

  const navigate = useNavigate();
 
  useEffect(() => {
    // Get user's audio stream when the component mounts
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setAudioStream(stream);

        // Create a MediaRecorder instance
        const recorder = new MediaRecorder(stream);

        // Set the media recorder in state
        setMediaRecorder(recorder);

        // Listen to dataavailable event to capture audio chunks
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            // Create a blob from the recorded data
            const audioBlob = new Blob([event.data], { type: 'audio/wav' });

            // Send the recorded audio to the backend
            sendAudioToBackend(audioBlob);
          }
        };

        recorder.onstart = () => {
          setRecording(true);
        };

        recorder.onstop = () => {
          setRecording(false);
        };

        // Start recording when the component mounts
        recorder.start();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });

    // Clean up the audio stream and media recorder when the component unmounts
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
    }
  };

  const sendAudioToBackend = (audioBlob) => {
    const formData = new FormData();
    formData.append('audio_file', audioBlob);

    axios
      .post('https://flat-star-41744.botics.co/profile/transcript/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `token ${localStorage.getItem('token')}`
        },
      })
      .then((response) => {
        console.log('Audio sent to backend:', response.data);
        navigate(
          '/listofrequirements',
          {
            state: {
              userdata:response.data
            }
          }
        )
        
      })
      .catch((error) => {
        console.error('Error sending audio to backend:', error);
      });
  };

  return (
    <div>
      {/* <p>Recording: {recording ? 'Yes' : 'No'}</p> */}


      <div className='cardBody'><Card.Title className='cardTitle'>
        <div className='headerlogo'>
          <Image src={logo} alt="Image" className='mainlogo' />

        </div>
      </Card.Title>

        <span className='textcss1'>Recording has started successfully, please click here to stop the call recording.</span>

        <button onClick={stopRecording} disabled={!recording}>
          Stop Recording
        </button>

      </div>

    </div>
  );
};

export default AudioRecorder;
