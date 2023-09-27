
import { useState } from 'react'
import { Card, Button, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { forgetPassword } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../assets/Images/logo.svg';
const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch()
  let navigate = useNavigate();
  const response = useSelector(state => state)

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;

    setEmail(inputEmail);

    // Clear the error for email field if it becomes valid

    if (errors.email && isEmailValid(inputEmail)) {
      const updatedErrors = { ...errors };

      delete updatedErrors.email;

      setErrors(updatedErrors);
    }
  };
  const isEmailValid = (inputEmail) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(inputEmail);
  };
  const body = {
    email: email
  }
  const handleSubmit = (e) => {

    e.preventDefault()
    dispatch(forgetPassword(body))
      .then((result) => {
        if (result.payload.msg != '') {
          toast.success(result.payload.msg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
          });
        }else if (result.payload.non_field_errors[0] != '') {

          toast.error(result.payload.non_field_errors[0], {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
          });
        }



      })
      // .catch((error) => {
      //   console.log(error,"error")
      //   toast.error("Invalid value", {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //   });
      // });


    const validationErrors = {};
    // navigate('/forgetpasschange')

    if (!isEmailValid(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }
    setErrors({});
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        style={{
          width: "28rem",
          textAlign: "left",
          height: "35rem",
          boxShadow: "0px 4px 5px 0px #4B4B4B",
        }}
      >
        <div >
          <Card.Img
            variant="top"
            className="d-flex my-4 mx-auto"
            style={{ width: "100px" }}
          />
          <ToastContainer />
        </div>
        <Card.Body className="p-0 m-0">
          <div className="text-center p-2" >
            <Card.Title className='cardTitle'> <Image src={logo} alt="Image" className='loginlogo' />
            </Card.Title>
            <Card.Title className='mainheader mt-5'>Forget Password</Card.Title>
          </div>
          <Form className="p-4 pb-0" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-start">Enter registered email</Form.Label>
              <Form.Control type="email" className='textboxcss' onChange={handleEmailChange} value={email} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type='submit'
              className='mt-3 cardbtn1'
            >
              Reset password
            </Button>
          </Form>
          <div className="p-4">
            <Button
              type='submit'
              className='cancelButton'
              onClick={() => navigate("/")}
            >
              Cancel
            </Button></div>

        </Card.Body>

      </Card>
    </div>
  )
}

export default ForgetPassword