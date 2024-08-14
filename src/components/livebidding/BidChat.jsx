import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('https://energy-backend-ww4p.onrender.com');

const BidChat = ({ productId, userId }) => {
    const [messages, setMessages] = useState([]);

    const [currentBid, setCurrentBid] = useState(0);
    const [bidAmount, setBidAmount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch initial bid data
        socket.emit('getInitialBid', { productId });

        // Join the bid room
        socket.emit('joinBid', { userId, productId });

        // Listen for chat messages
        socket.on('bidMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Listen for real-time bid updates
        socket.on('bidUpdated', (updatedBid) => {
            setCurrentBid(updatedBid.currentBid);
            setBidAmount(updatedBid.currentBid + 1); // Automatically set bid amount to at least 1 higher
            setError(''); // Clear any previous errors
        });

        // Listen for bid errors
        socket.on('bidError', (errorMessage) => {
            setError(errorMessage);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('bidMessage');
            socket.off('bidUpdated');
            socket.off('bidError');
        };
    }, [productId, userId]);

    // Handle raising the bid
    const handleRaiseBid = () => {
        if (bidAmount > currentBid) {
            socket.emit('raiseBid', { userId, productId, bidAmount });

            // Automatically send a chat message notifying about the bid raise
            const message = `Bid raised to $${bidAmount}`;
            socket.emit('sendBidMessage', { productId, message: { userId, text: message } });
 // Clear the message input
        } else {
            setError('Your bid must be higher than the current bid.');
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h4>Current Bid: ${currentBid}</h4>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Control
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        min={currentBid + 1}
                        placeholder="Enter your bid"
                    />
                    <Button className="mt-2" onClick={handleRaiseBid}>Raise Bid</Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <ListGroup>
                        {messages.map((msg, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{msg.userId}:</strong> {msg.text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            {/* You can remove this Row if you don't want the manual message input */}
        </Container>
    );
};

export default BidChat;
