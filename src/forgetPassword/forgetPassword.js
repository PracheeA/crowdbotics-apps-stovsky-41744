
import { useState } from 'react'
import { Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch()
  let navigate = useNavigate();
  const response = useSelector(state => state)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        style={{
          width: "28rem",
          textAlign: "left",
          height:"35rem",
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
          <Card.Title className='cardTitle'>Stovsky</Card.Title>
            <Card.Title className='mainheader mt-5'>Forget Password</Card.Title>
          </div>
          <Form className="p-4 my-2" >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-start">Enter registered email</Form.Label>
              <Form.Control type="email"  className='textboxcss' value={email} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type='submit'
              className='mt-3 mb-2 cardbtn1'
            >
              Reset password
            </Button>
            <Button
              type='submit'
              className=' mb-5 cancelButton'
            >
             Cancel
            </Button>
          </Form>
        </Card.Body>

      </Card>
    </div>
  )
}

export default ForgetPassword