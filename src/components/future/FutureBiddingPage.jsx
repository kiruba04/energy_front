import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const FutureBiddingPage = () => {
    const [futureBids, setFutureBids] = useState([]);

    useEffect(() => {
        const fetchFutureBids = async () => {
            try {
                const response = await axios.get('http://localhost:8800/api/products/future');
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
                        <Card>
                            <Card.Body>
                                <Card.Title>{bid.type}</Card.Title>
                                <Card.Text>Contract: {bid.contract}</Card.Text>
                                <Card.Text>Available: {bid.available}</Card.Text>
                                <Card.Text>Price: ${bid.price}</Card.Text>
                                <Card.Text>Bid Time: {bid.startbidTime} - {bid.endbidTime}</Card.Text>
                                <Card.Text>Date: {bid.date}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FutureBiddingPage;
