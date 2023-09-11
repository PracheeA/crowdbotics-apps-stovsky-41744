
import { useState } from 'react'
import { Card, Button, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import './login.css'
import FacebookLoginButton from './FacebookLoginButton';
import google from '../assets/Images/google.svg'
import apple from '../assets/Images/apple.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { facebookLogin, signUpUser, signinuser } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import logo from '../assets/Images/logo.svg';
const Login = () => {
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState('');
  const [email1, setEmail1] = useState("")
  const [errors, setErrors] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [issignupActive, setissignupActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState("");
  const [showEyePass, setShowEyePass] = useState(false);
  const [showEye1, setShowEye1] = useState(false);
  const [showPasswordPass, setShowPasswordPass] = useState(false);
  const [tnc, setTnc] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleTogglePasswordVisibilityPassword = () => {
    setShowPasswordPass((prevShowPassword) => !prevShowPassword);
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail1(inputEmail);

    if (errors.email1 && isEmailValid(inputEmail)) {
      const updatedErrors = { ...errors };
      delete updatedErrors.email1;
      setErrors(updatedErrors);
    }
  };
  const handleEmailChange1 = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    if (errors.email && isEmailValid(inputEmail)) {
      const updatedErrors = { ...errors };
      delete updatedErrors.email;
      setErrors(updatedErrors);
    }
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (event) => {
    if (event.target.value.length > 0) {
      setShowEye(true)
    } else {
      setShowEye(false)
    }

    const inputPassword = event.target.value;
    setPassword1(inputPassword);

    if (errors.password && inputPassword.trim().length > 8) {
      const updatedErrors = { ...errors };
      delete updatedErrors.password;
      setErrors(updatedErrors);
    }
  };

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


  const isEmailValid = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };
  const isPasswordValid = (inputPassword) => {
    return inputPassword.trim().length > 0;
  };

  const dispatch = useDispatch()
  let navigate = useNavigate();
  const response = useSelector(state => state)

  const [show, setShow] = useState(false);
  const [login, setlogin] = useState(true);

  const signup = () => {
    setShow(true)
    setIsActive(false)
    setissignupActive(true)
    setlogin(false)
  }

  const log = () => {
    setShow(false)
    setIsActive(true)
    setissignupActive(false)
    setlogin(true)
  }



  const responseFacebook = (accessToken) => {

    if (accessToken) {
      const body = {
        access_token: accessToken
      }

      let data = JSON.stringify(body)
      dispatch(facebookLogin(data))
        .then((result) => {
          console.log(result.payload.key, "result.payload.key")
          if (result.payload.key) {
            // dispatch(getUserProfile())
            //   .then((result) => {
            //     localStorage.setItem('role', result.payload.role)
            //     localStorage.setItem('username', result.payload.username)
            //     if (result.payload.role == 'supplier') {
            //       navigate('/quotationDashboard')
            //     } else if (result.payload.role == 'contractor') {
            //       navigate('/contractorDashboard')
            //     } else if (result.payload.role == 'trucking') {
            //       navigate('/truckingdashboard')
            //     } else {
            //       navigate('/profileinformation')
            //     }

            //   })
            //   .catch((errordata) => {

            //   });
          }
        })
        .catch((error) => {
          console.log(error)
        });

    } else {

    }

  }
  const clientId = '703994537834-unfmjdmmh0qf3ansl1n84bkqf9rdrepc.apps.googleusercontent.com'
  const handleGoogleSignInAPI = async dispatch => {
    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "https://www.googleapis.com/auth/userinfo.email",
        callback: res => {
          console.log(res, 'res')
          if (res?.access_token) {

            const body = {
              access_token: res.access_token
            }
            let data = JSON.stringify(body)
            let config = {
              method: "post",
              url: 'https://flat-star-41744.botics.co/modules/social-auth/google/connect/',
              headers: {
                "Content-Type": "application/json"
              },
              data: data
            }

            axios
              .request(config)
              .then(response => {
                console.log(response)
                // localStorage.setItem("token", response.data.key)
                // googlelogin(response.data.key)
              })
              .catch(error => {
                window.scrollTo(0, 0)
                if (error?.response?.status === 400) {
                  console.log(error, "error")
                  toast.error(error.response.data.non_field_errors[0], {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                }
              })
          } else {
            window.scrollTo(0, 0)
            toast.error("No access token", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
              hideProgressBar: true,
            });
          }
        },
        error_callback: err => {
          window.scrollTo(0, 0)
          // toast.error("No access token", {
          //   position: toast.POSITION.TOP_RIGHT,
          //   autoClose: 2000,
          //   hideProgressBar: true,
          // });
        }
      })
      console.log(await client.requestAccessToken())
    } catch (err) { }
  }

  const isConfirmPasswordValid = (inputPassword) => {
    // Implement your own password validation logic

    return inputPassword.trim().length > 8
  };

  const handleFormSubmit = (event) => {

    event.preventDefault();

    // form validation
    const validationErrors = {};
    if (!isEmailValid(email1)) {
      validationErrors.email1 = 'Please enter a valid email address.';
    }
    if (!isPasswordValid(password1)) {
      validationErrors.password1 = 'Please enter a valid password';
    }
    console.log('Logged in with email:', email1);
    //Set validation errors if any
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset form fields and errors
    setEmail('');
    setPassword('');
    setErrors({});
    const body = {
      email: email1?.toLowerCase(),
      password: password1
    }

    dispatch(signinuser(body))
      .then((result) => {
        // if (result.payload.key) {
        //   dispatch(getUserProfile())
        //     .then((result) => {
        //       localStorage.setItem('role', result.payload.role)
        //       localStorage.setItem('username', result.payload.username)
        //       if (result.payload.role == 'supplier') {
        //         navigate('/quotationDashboard')
        //       } else if (result.payload.role == 'contractor') {
        //         navigate('/contractorDashboard')
        //       } else if (result.payload.role == 'trucking') {
        //         navigate('/truckingdashboard')
        //       } else {
        //         navigate('/profileinformation')
        //       }

        //     })
        //     .catch((errordata) => {

        //     });
        // } else {

        // }
      })
      .catch((error) => {
        console.log(error)
      });

  };
  const isPasswordMatches = (inputPassword) => {
    return inputPassword === password
  }
  const handleFormSubmit1 = (event) => {
    event.preventDefault();


    const validationErrors = {};
    console.log("data1")

    if (!isEmailValid(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!isPasswordValid(password)) {
      validationErrors.password = "Please enter a valid password";
    }

    if (!isConfirmPasswordValid(confirm_password)) {
      validationErrors.confirm_password = "Please enter a valid password";
    }
    if (!isPasswordMatches(confirm_password)) {
      validationErrors.confirm_password_matches = "Password and Confirm does not match";
    }

    if (!tnc) {
      validationErrors.tnc = "Please accept the terms & conditions";
    }

    if (!rememberMe) {
      validationErrors.rememberMe = 'Please accept the terms';
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }
    if (Object.keys(validationErrors).length === 0) {
      setEmail("");
      setPassword("");
      setConfirm_password("");
      setRememberMe(false);
      setTnc(false);
      setIsChecked(false);
      setisTermChecked(false)

      console.log("data")

      const body = {
        email: email,
        password: password,
        confirm_password: confirm_password
      }

      setTnc(false);
      dispatch(signUpUser(body))
    }

    setErrors({});
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleRememberMeChange = () => {
    setIsChecked(!isChecked);
    setRememberMe(!rememberMe);
    if (errors.rememberMe) {
      const updatedErrors = { ...errors };
      delete updatedErrors.rememberMe;
      setErrors(updatedErrors);
    }
  };
  const [isTermChecked, setisTermChecked] = useState(false);

  const handleTermsNConditionsChange = () => {
    setisTermChecked(!isTermChecked)
    setTnc(!tnc);
    if (errors.tnc) {
      const updatedErrors = { ...errors };
      delete updatedErrors.tnc;
      setErrors(updatedErrors);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        className=" my-4"
        style={{
          width: "28rem",
          textAlign: "left",
          height: "40rem",
          boxShadow: "0px 4px 5px 0px #4B4B4B",
        }}
      >

        <Card.Body className="p-0 m-0">
          <div className="text-center " >
            <Card.Title className='p-4'>
                <Image src={logo} alt="Image" className='loginlogo' />

            </Card.Title>
            <ToastContainer />
          </div>
          <div className='tabheader'>
            <Card.Title className={isActive ? 'activeclass' : 'inactive'} onClick={() => { log() }}>Log In</Card.Title>
            <Card.Title className={issignupActive ? 'activeclass' : 'inactive'} onClick={() => { signup() }}>Sign up</Card.Title>

          </div>

          {show && <div >
            <Form className="p-4 my-2" onSubmit={handleFormSubmit1}>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label className="text-start">
                  Enter Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  className='textboxcss'
                  value={email}
                  onChange={handleEmailChange1}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className="text-start">Create Password</Form.Label>
                <Form.Control
                  type={showPasswordPass ? "text" : "password"}
                  className='textboxcss'
                  value={password}
                  onChange={handlePasswordChange1}
                  isInvalid={!!errors.password}
                />
                {showEye1 && (
                  <FontAwesomeIcon
                    className="eyeiconcp"
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
                <Form.Label className="text-start">Confirm Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  className='textboxcss'
                  value={confirm_password}
                  onChange={handleConfirmPasswordChange}
                  isInvalid={!!errors.confirm_password || !!errors.confirm_password_matches}
                />
                {showEyePass && (
                  <FontAwesomeIcon
                    className="eyeiconp"
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={handleTogglePasswordVisibility}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  {errors.confirm_password_matches || errors.confirm_password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2" controlId="formRememberMe">
                <Form.Check
                  type="checkbox"
                  name='tnc'
                  isInvalid={!!errors.tnc}
                  checked={isTermChecked}
                  onChange={handleTermsNConditionsChange}
                  label="I have read the Terms and Conditions and Privacy Policy"
                  className='labelcss'
                />
                <Form.Control.Feedback type="invalid">{errors.tnc}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2" controlId="formRememberMe">
                <Form.Check
                  type="checkbox"
                  name='rememberMe'
                  onChange={handleRememberMeChange}
                  checked={isChecked}
                  isInvalid={!!errors.rememberMe}
                  label="Remember me"
                  className='labelcss'
                />
                <Form.Control.Feedback type="invalid">{errors.rememberMe}</Form.Control.Feedback>
              </Form.Group>
              <Button
                type='submit'
                className='mt-1 mb-2 cardbtn1'
              >
                Sign up
              </Button>

            </Form>
          </div>}

          {login && <div >
            <Form onSubmit={handleFormSubmit} className="p-4 my-2" >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-start">Enter Email Address</Form.Label>

                <Form.Control
                  type="email"
                  value={email1}
                  className='textboxcss'
                  onChange={handleEmailChange}
                  isInvalid={!!errors.email1}
                />
                <Form.Control.Feedback type="invalid">{errors.email1}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-start">Enter password</Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={password1}
                  className='textboxcss'
                  onChange={handlePasswordChange}
                  isInvalid={!!errors.password1}
                />

                {showEye &&

                  <FontAwesomeIcon
                    className={errors ? 'eyeicon1' : 'eyeicon'}
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={handleTogglePasswordVisibility}
                  />}

                <Form.Control.Feedback type="invalid">{errors.password1}</Form.Control.Feedback>
                <p className="my-2 text-center labelcss" style={{ marginLeft: '64%', cursor: 'pointer' }} onClick={() => navigate("/forgetpassword")}>
                  <Link to="/forgetpassword" state={{}}> <span className='signupcss' style={{ fontFamily: 'Roboto-bold' }} >Forgot Password</span>
                  </Link>
                </p>
              </Form.Group>


              <Button
                type='submit'
                className='mt-3 mb-2 cardbtn1'
              >
                Log In
              </Button>

            </Form>

            <p className="my-2 text-center labelcss" >or login with</p>
            <div className='lgimageflex'>
              <Image src={apple} className='applelogin' />
              <FacebookLoginButton onFacebookLogin={responseFacebook} />

              <Image src={google} alt="Image" className='googleimage' onClick={() => {
                handleGoogleSignInAPI()
              }} />
            </div>
          </div>}

        </Card.Body>

      </Card>
    </div>
  )
}

export default Login