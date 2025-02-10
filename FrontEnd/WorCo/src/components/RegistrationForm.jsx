import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const RegistrationForm = () => {
  // State to store form data and API response
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    password: "",
    userType: "User",
  });

  const [message, setMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create fullName and createdAt fields
    const fullData = {
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`,
      passwordHash: formData.password, // Assuming backend hashes it
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
    };

    try {
      const response = await fetch("http://localhost:8080/worco/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "User registered successfully!" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          userType: "WORKER",
        });
      } else {
        setMessage({ type: "danger", text: "Registration failed!" });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Error connecting to server." });
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Register</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name = "fullName"
            value = {formData.fullName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User Type</Form.Label>
          <Form.Select name="userType" value={formData.userType} onChange={handleChange}>
            <option value="User">User</option>
            <option value="Worker">Worker</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegistrationForm;
