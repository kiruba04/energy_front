import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './future.css';

const FutureBiddingPage = () => {
    const [futureBids, setFutureBids] = useState([]);

    useEffect(() => {
        const fetchFutureBids = async () => {
            try {
                const response = await axios.get('https://energy-backend-ww4p.onrender.com/api/products/future');
                setFutureBids(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchFutureBids();
    }, []);

    return (
        <Container>
            <Row className="my-4">
                {futureBids.map((bid) => (
                    <Col key={bid._id} sm={12} md={6} lg={4} className="mb-4">
                        <Card className='cardui'>
                            <Card.Body>
                                <Card.Title className='text-head'>{bid.type}</Card.Title>
                                <Card.Text>Contract: {bid.contract}</Card.Text>
                                <Card.Text>Available: {bid.available}</Card.Text>
                                <Card.Text>Price: Rs.{bid.price}</Card.Text>
                                <Card.Text>Bid Time: {bid.startbidTime} - {bid.endbidTime}</Card.Text>
                                <Card.Text>Date: {new Date(bid.date).toLocaleDateString()}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FutureBiddingPage;
