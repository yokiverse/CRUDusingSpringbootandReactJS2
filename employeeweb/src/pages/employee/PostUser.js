import { useState } from "react";
import "./PostUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting Form Data:", formData);
        try {
            const response = await fetch('http://localhost:8080/api/employee', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Employee Created:", data);
            navigate("/");  // Navigate after successful post
        } catch (error) {
            console.error("Error while creating employee:", error.message);
            alert("An error occurred while creating the employee. Please try again.");
        }
    };

    return (
        <div className="center-form">
            <h1>Post New Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Please Enter the Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Please Enter the Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPhone">
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Please Enter the Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicDepartment">
                    <Form.Control
                        type="text"
                        name="department"
                        placeholder="Please Enter the Department"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Post Employee
                </Button>
            </Form>
        </div>
    );
};

export default PostUser;
