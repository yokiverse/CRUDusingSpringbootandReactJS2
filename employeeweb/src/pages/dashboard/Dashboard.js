import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/getallemployee');
                const data = await response.json();
                setEmployee(data);
            } catch (error) {
                console.error("Error while fetching data:", error.message);
            }
        };
        fetchAllEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setEmployee((prevEmployees) =>
                    prevEmployees.filter((emp) => emp.id !== employeeId)
                );
            }
            console.log(`Employee with id ${employeeId} deleted`);
        } catch (error) {
            console.error("Error while deleting employee:", error.message);
        }
    };

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center" >Employees</h1>
                    <Table striped bordered hover responsive className="table-info">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Employee Email</th>
                                <th>Employee Phone</th>
                                <th>Employee Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.phone}</td>
                                    <td>{emp.department}</td>
                                    <td>
                                        <Button
                                            variant="outline-secondary"
                                            className="btn btn-primary"
                                            
                                            onClick={() => handleUpdate(emp.id)}
                                        >
                                            Edit
                                        </Button>{' '}
                                        <Button
                                            variant="outline-secondary"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(emp.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
