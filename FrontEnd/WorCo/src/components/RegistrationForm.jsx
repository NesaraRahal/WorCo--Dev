import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "USER", // Default to USER in uppercase
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "danger", text: "Passwords do not match!" });
      return;
    }

    const fullData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      passwordHash: formData.password, // Backend expects 'passwordHash'
      userType: formData.userType.toUpperCase(),
      createdAt: new Date().toISOString().slice(0, 19),
    };

    try {
      const response = await axios.post("http://localhost:8080/worco/users", fullData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setMessage({ type: "success", text: "User registered successfully!" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          userType: "USER",
        });
      }
    } catch (error) {
      setMessage({ type: "danger", text: error.response?.data?.message || "Registration failed!" });
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Register</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User Type</Form.Label>
          <Form.Select name="userType" value={formData.userType} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="WORKER">Worker</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Register</Button>
      </Form>
    </Container>
  );
};

export default RegistrationForm;
