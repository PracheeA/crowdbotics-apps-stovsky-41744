import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import facebook from '../assets/Images/facebook.svg'
import { Card, Button, Form, Image } from "react-bootstrap";
const FacebookLoginButton = ({ onFacebookLogin }) => {
  const responseFacebook = (response) => {
    onFacebookLogin(response.accessToken);
  };

  return (

    <FacebookLogin
      appId="655717856521498"
      autoLoad={false}
      fields="name,picture"
      scope="email"
      callback={responseFacebook}

      render={(renderProps) => (
        <Image src={facebook} onClick={renderProps.onClick} alt="Image" className='lgimage' />

      )}
    />
  );
};

export default FacebookLoginButton;
