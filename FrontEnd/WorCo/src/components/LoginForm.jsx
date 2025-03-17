import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";


const LoginForm = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) =>{
    setLoginData({...loginData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) =>{
    setLoginData({...loginData, [e.target.name]: e.target.value})
  }

  return (
    <Container className = "mt-5">
      <h2 className="text-center">WorCo-Login</h2>
      <Form onSubmit= {handleSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" name="email" value={loginData.email} onChange={handleChange} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={loginData.password} onChange={handleChange} required />
      </Form.Group>
      </Form>

      <Button variant="primary" type="submit" className="w-100">Login</Button>

    </Container>
  )
}

export default LoginForm
