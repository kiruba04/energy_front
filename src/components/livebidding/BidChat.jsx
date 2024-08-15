import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import io from 'socket.io-client';
import './live.css';

const socket = io('https://energy-backend-ww4p.onrender.com');

const BidChat = ({ productId, userId }) => {
    const [messages, setMessages] = useState([]);
    const [currentBid, setCurrentBid] = useState(0);
    const [bidAmount, setBidAmount] = useState(0);
    const [timer, setTimer] = useState(100); // Initialize the timer
    const [error, setError] = useState('');
    const [display, setDisplay] = useState('true');

    // Memoize closeBidding function to prevent unnecessary re-renders
    const closeBidding = useCallback(() => {
        socket.emit('closeBid', { productId });
        setDisplay('false');
        setError('Bidding has closed.');
    }, [productId]);

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
            setTimer(40); // Reset the timer when a new bid is placed
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

    // Handle the countdown timer
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    closeBidding(); // Close the bidding when timer reaches 0
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(countdown);
    }, [currentBid, closeBidding]);

    // Handle raising the bid
    const handleRaiseBid = () => {
        if (bidAmount > currentBid) {
            socket.emit('raiseBid', { userId, productId, bidAmount });

            // Automatically send a chat message notifying about the bid raise
            const message = `Bid raised to RS.${bidAmount}`;
            socket.emit('sendBidMessage', { productId, message: { userId, text: message } });
        } else {
            setError('Your bid must be higher than the current bid.');
        }
    };

    // Get the current user's ID from localStorage
    const user = localStorage.getItem('user');
    const currentUserId =user._id;

    return (
        <Container className='bg-light bgtext'>
            <Row>
                <Col>
                    <h3 className='text-center header headfont'>Current Bid: Rs.{currentBid}</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h4 className='text-center'>Time Remaining: {timer} seconds</h4>
                    <Row className="mt-3 mb-3">
                        <Col>
                            <ListGroup>
                                {messages.map((msg, index) => (
                                    <ListGroup.Item 
                                        key={index} 
                                        className={`textbox mt-3 ${msg.userId === currentUserId ? 'my-message' : ''}`}
                                    >
                                        <strong>{msg.userId}:</strong> {msg.text}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                    <Form.Control
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        min={currentBid + 1}
                        placeholder="Enter your bid"
                        className='bid bitside'
                        disabled={display === 'false'} // Disable input when bidding is closed
                    />
                    <Button 
                        className="mt-2 mb-5 bitside" 
                        onClick={handleRaiseBid} 
                        variant='success'
                        disabled={display === 'false'} // Disable button when bidding is closed
                    >
                        Raise Bid
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default BidChat;
