import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const WorkerRegistrationForm = () => {
    const [workerFormData, setWorkerFormData] = useState({
        userId: "",
        nic: "",
        firstName: "",
        lastName: "",
        fullName: "",
        email: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>{
        e.preventDeafult();

        const fullData = {
            userId: workerFormData.userId,
            nic: workerFormData.nic,
            firstName: workerFormData.firstName,
            lastName: workerFormData.lastName,
            fullName: `${workerFormData.firstName} ${workerFormData.lastName}`,
            email: workerFormData.email,
            passwordHash: workerFormData.password, // Backend expects 'passwordHash'
            createdAt: new Date().toISOString().slice(0, 19),
          };

        const response = await axios.post("http://localhost:8081/worco/workers", fullData,{
            headers: { "Content-Type": "application/json" },
        });

        if(response == 200){
            setWorkerFormData({
                userId: "",
                nic: "",
                firstName: "",
                lastName: "",
                fullName: "",
                email: "",
                passwordHash: "",

                // redirect to worker profile/dashboard
            })
        }
    }

  return (
    <div>
      
    </div>
  )
}

export default WorkerRegistrationForm
