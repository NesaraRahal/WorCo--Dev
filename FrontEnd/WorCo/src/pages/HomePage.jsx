import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavBar from "../components/Navbar";

const HomePage = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const getWorkers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/worco/workers");
        setWorkers(response.data); // Assuming API returns an array of workers
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    getWorkers();
  }, []);

  return (
    <div>
      <NavBar />
      <Container className="mt-5">
        <h2 className="mb-4">Available Workers</h2>
        <Row>
          {workers.map((worker) => (
            <Col key={worker.id} md={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{worker.full_name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {worker.email}
                  </Card.Subtitle>
                  <Card.Text>
                    Worker ID: {worker.id}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
