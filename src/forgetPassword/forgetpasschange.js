import { useState, useEffect } from 'react'
import { Card, Button, Form,Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { resetPassword } from '../redux/authSlice';
import { useParams } from "react-router";
import './forgetPassword.css';
import logo from '../assets/Images/logo.svg';
const Forgetpasschange = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState("");
  const [showEyePass, setShowEyePass] = useState(false);
  const [showEye1, setShowEye1] = useState(false);
  const [showPasswordPass, setShowPasswordPass] = useState(false);
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch()
  let navigate = useNavigate();
  // let { token } = useParams();
  const [tokenKey, setTokenKey] = useState("");
  const [tokenId, setTokenId] = useState("");


  const response = useSelector(state => state?.user?.detail)


  const currentURL = window.location.href;

  // Create a URLSearchParams object to parse the query parameters
  const urlSearchParams = new URLSearchParams(new URL(currentURL).search);

  // Get the 'token' parameter from the URL
  const token = urlSearchParams.get('token');

  // Do something with the token
  console.log('Token:', token);


  useEffect(() => {
    setTokenId(token.split("-")[2])
    setTokenKey(token.split("-")[0] + "-" + token.split("-")[1])
  }, [])
  const body = {
    new_password1: password,
    new_password2: confirm_password,
    uid: tokenId,
    token: tokenKey
  }
  const handlePasswordChange1 = (event) => {
    if (event.target.value.length > 0) {
      setShowEye1(true);
    } else {

      setShowEye1(false);
    }

    const inputPassword = event.target.value;
    setPassword(inputPassword);

    if (errors.password && inputPassword.trim().length > 8) {
      const updatedErrors = { ...errors };
      delete updatedErrors.password;
      setErrors(updatedErrors);
    }
  };
  const handleConfirmPasswordChange = (event) => {
    if (event.target.value.length > 0) {
      setShowEyePass(true)
    } else {
      setShowEyePass(false)
    }
    const inputPassword = event.target.value;

    setConfirm_password(inputPassword);

    // Clear the error for password field if it becomes non-empty

    if (errors.confirm_password && inputPassword.trim().length > 8) {
      const updatedErrors = { ...errors };

      delete updatedErrors.confirm_password;

      setErrors(updatedErrors);
    }
    if (errors.confirm_password_matches && inputPassword === password) {
      const updatedErrors = { ...errors };

      delete updatedErrors.confirm_password_matches;

      setErrors(updatedErrors);
    }
  };
  const handleTogglePasswordVisibilityPassword = () => {
    setShowPasswordPass((prevShowPassword) => !prevShowPassword);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const isConfirmPasswordValid = (inputPassword) => {
    // Implement your own password validation logic

    return inputPassword.trim().length > 8
  };

  ////////////////

  const isPasswordValid = (inputPassword) => {
    return inputPassword.trim().length > 8;
  };
  const isPasswordMatches = (inputPassword) => {
    return inputPassword === password
  }

  const handleSubmit = (event) => {
    event.preventDefault();


    const validationErrors = {};


    if (!isPasswordValid(password)) {
      validationErrors.password = "Please enter a valid password";
    }

    if (!isConfirmPasswordValid(confirm_password)) {
      validationErrors.confirm_password = "Please enter a valid password";
    }
    if (!isPasswordMatches(confirm_password)) {
      validationErrors.confirm_password_matches = "Password and Confirm does not match";
    }



    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }
    if (Object.keys(validationErrors).length === 0) {

      setPassword("");
      setConfirm_password("");

      dispatch(resetPassword(body))
        .then((result) => {
         console.log(result,"result")
         
            toast.success(result.payload.msg, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: true,
            });

            toast.error(result.payload.new_password2[0], {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: true,
            });
        })
        .catch((error) => {
          toast.error(error.payload.new_password2[0],error.payload.new_password2[1], {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
          });
        });
    }

    setErrors({});
  };
  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ToastContainer />
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
          
        </div>
        <Card.Body className="p-0 m-0">
          <div className="text-center p-2" >
            <Card.Title className='cardTitle'> <Image src={logo} alt="Image" className='loginlogo' />
</Card.Title>
            <Card.Title className='mainheader mt-5'>Reset Password</Card.Title>
          </div>
          <Form className="p-4 my-2" onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="text-start">Enter Password</Form.Label>
              <Form.Control
                type={showPasswordPass ? "text" : "password"}
                className='textboxcss'
                value={password}
                onChange={handlePasswordChange1}
                isInvalid={!!errors.password}
              />
              {showEye1 && (
                <FontAwesomeIcon
                  className="forgeteyeiconcp"
                  icon={showPasswordPass ? faEye : faEyeSlash}
                  onClick={handleTogglePasswordVisibilityPassword}
                />
              )}
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicConfirmPassword"
            >
              <Form.Label className="text-start">Enter Re-Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                className='textboxcss'
                value={confirm_password}
                onChange={handleConfirmPasswordChange}
                isInvalid={!!errors.confirm_password || !!errors.confirm_password_matches}
              />
              {showEyePass && (
                <FontAwesomeIcon
                  className="forgeteyeiconp"
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={handleTogglePasswordVisibility}
                />
              )}
              <Form.Control.Feedback type="invalid">
                {errors.confirm_password_matches || errors.confirm_password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type='submit'
              className='mt-3 cardbtn1'
            >
              Reset password
            </Button>
            <div className='forgetbackimg' onClick={()=>navigate('/')}>
            Back to login
          </div>
          </Form>


        </Card.Body>

      </Card>
    </div>
  )
}

export default Forgetpasschange