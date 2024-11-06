import './UpdateUser.css';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const UpdateUser= ()=>{

    const {id} =useParams();


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


    useEffect( ()=>{
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`)
                const data = await response.json();
                setFormData(data);
                } catch (error) {
                    console.error(error);
                    }
                }
                fetchEmployee();

    },[id]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    });
                    const data = await response.json();
                    console.log("User Updated : ", data);
                    navigate('/');
                }
                catch (error) {
                    console.error("Error while updating User:",error);
                    }
                    };
    

    return(
        <div className="center-form">
        <h1>Edit Employee</h1>
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
                Edit Employee
            </Button>
        </Form>
    </div>
    )
}
export default UpdateUser;