import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const CompanyDashboard = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        contract: '',
        available: '',
        price: '',
        startbidTime: '',
        endbidTime: '',
        date: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error("User not found in localStorage");
                }
                const companyId = user._id; // Get the company ID from localStorage
                const response = await axios.get(`http://localhost:8800/api/products/company/${companyId}`);
                setProducts(response.data);
            } catch (err) {
                console.error(err);
                setProducts([]); // Optionally clear products if an error occurs
            }
        };
        fetchProducts();
    }, []); // Empty dependency array to run only once when component mounts
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const companyId = JSON.parse(localStorage.getItem('user'))._id; // Get the company ID from localStorage
            const response = await axios.post('http://localhost:8800/api/products/create', {
                ...formData,
                companyId, // Include company ID in the request body
            });
            setProducts([...products, response.data]);
            setFormData({
                type: '',
                contract: '',
                available: '',
                price: '',
                startbidTime: '',
                endbidTime: '',
                date: '',
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/api/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h2>Create a Product</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="contract" className="mt-3">
                            <Form.Label>Contract</Form.Label>
                            <Form.Control
                                type="text"
                                name="contract"
                                value={formData.contract}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="available" className="mt-3">
                            <Form.Label>Available</Form.Label>
                            <Form.Control
                                type="text"
                                name="available"
                                value={formData.available}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="price" className="mt-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="startbidTime" className="mt-3">
                            <Form.Label>Start Bid Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="startbidTime"
                                value={formData.startbidTime}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="endbidTime" className="mt-3">
                            <Form.Label>End Bid Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="endbidTime"
                                value={formData.endbidTime}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="date" className="mt-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Create Product
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="my-4">
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{product.type}</Card.Title>
                                <Card.Text>Contract: {product.contract}</Card.Text>
                                <Card.Text>Available: {product.available}</Card.Text>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Card.Text>Bid Time: {product.startbidTime} - {product.endbidTime}</Card.Text>
                                <Card.Text>Date: {product.date}</Card.Text>
                                <Button variant="danger" onClick={() => handleDelete(product._id)}>
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CompanyDashboard;
