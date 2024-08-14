import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import BidChat from './BidChat'; // Import the BidChat component

const Live = () => {
    const [liveBids, setLiveBids] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');
    const [currentBid, setCurrentBid] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchLiveBids = async () => {
            try {
                const response = await axios.get('https://energy-backend-ww4p.onrender.com/api/products/live');
                setLiveBids(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchLiveBids();
    }, []);

    const handleJoin = (productId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            setAlertMessage('You must be logged in to join a bid.');
            setAlertVariant('danger');
            return;
        }

        setUserId(user._id);
        setCurrentBid({ productId });
        setIsChatVisible(true);  // Show the chat interface
    };

    if (isChatVisible && currentBid) {
        return <BidChat productId={currentBid.productId} userId={userId} />;
    }

    return (
        <Container>
            {alertMessage && (
                <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <Row className="my-4">
                {liveBids.map((bid) => (
                    <Col key={bid._id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{bid.type}</Card.Title>
                                <Card.Text>Contract: {bid.contract}</Card.Text>
                                <Card.Text>Available: {bid.available}</Card.Text>
                                <Card.Text>Price: ${bid.price}</Card.Text>
                                <Card.Text>Bid Time: {bid.startbidTime} - {bid.endbidTime}</Card.Text>
                                <Card.Text>Date: {new Date(bid.date).toLocaleDateString()}</Card.Text>
                                <Button variant="success" onClick={() => handleJoin(bid._id)}>
                                    Join
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Live;
