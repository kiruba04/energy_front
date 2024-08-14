import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Company.css'
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
                const response = await axios.get(`https://energy-backend-ww4p.onrender.com/api/products/company/${companyId}`);
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
            const response = await axios.post('https://energy-backend-ww4p.onrender.com/api/products/create', {
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
            await axios.delete(`https://energy-backend-ww4p.onrender.com/api/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Row className="my-4 bg-dull">
                <Col>
                    <h2 className='headfont line'>Create a Product</h2>
                    <Form onSubmit={handleSubmit} className='font1 '>
                        <Row>
                            <Col xs={12} sm={6} md={4} lg={6}>
                                <Form.Group controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className='font2'
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={6}>
                                <Form.Group controlId="contract">
                                    <Form.Label>Contract</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="contract"
                                        value={formData.contract}
                                        onChange={handleChange}
                                        className='font2'
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={6}>
                                <Form.Group controlId="available">
                                    <Form.Label>Available</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="available"
                                        value={formData.available}
                                        onChange={handleChange}
                                        className='font2'
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={6}>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className='font2'
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={6}>
                                <Form.Group controlId="startbidTime">
                                    <Form.Label>Start Bid Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="startbidTime"
                                        value={formData.startbidTime}
                                        onChange={handleChange}
                                        className='font2'
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={6}>
                                <Form.Group controlId="endbidTime">
                                    <Form.Label>End Bid Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="endbidTime"
                                        value={formData.endbidTime}
                                        onChange={handleChange}
                                        className='font2'
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4} lg={6}>
                                <Form.Group controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className='font2'
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="outline-success" type="submit" className="mt-3 mb-5">
                            Create Product
                        </Button>
                    </Form>
                </Col>
            </Row>
            <h2 className='headfont line'>Product History</h2>
            <Row className="my-4">
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{product.type}</Card.Title>
                                <Card.Text>Contract: {product.contract}</Card.Text>
                                <Card.Text>Available: {product.available}</Card.Text>
                                <Card.Text>Price: Rs.{product.price}</Card.Text>
                                <Card.Text>Bid Time: {product.startbidTime} - {product.endbidTime}</Card.Text>
                                <Card.Text>Date: {new Date(product.date).toLocaleDateString()}</Card.Text>
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
