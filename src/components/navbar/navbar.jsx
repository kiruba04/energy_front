import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

const NavbarComponent = () => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null); // Add state for userType
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by checking localStorage
        const storedUser = localStorage.getItem('user');
        const storedUserType = localStorage.getItem('usertype');

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser); // Parse the user object
            setUser(parsedUser);
            setUserType(storedUserType);

            // Navigate to the appropriate dashboard based on usertype
            if (storedUserType === 'user') {
                navigate('/userdashboard');
            } else if (storedUserType === 'company') {
                navigate('/companydashboard');
            }
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            // Call the backend to clear cookies
            await axios.post('https://energy-backend-ww4p.onrender.com/api/user/logout', {}, {
                withCredentials: true,
            });

            // Clear user data from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('usertype');
            navigate('/');
            setUser(null);
            setUserType(null);
        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div>
            <Navbar className='bgnav' variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#">
                        <img
                            src="https://res.cloudinary.com/dsgdnskfj/image/upload/v1723629766/WhatsApp_Image_2024-08-14_at_11.46.52_21c9cea7_sdwlsl.png"
                            alt="Company Logo"
                            width="200"
                            height="60"
                            className='bg'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto bgfont">
                            <Nav.Link href="/" className=' bgfont'>Home</Nav.Link>
                            <Nav.Link href="/about" className=' bgfont'>About</Nav.Link>
                            <Nav.Link href="/marketplace" className=' bgfont'>Marketplace</Nav.Link>
                            <Nav.Link href="/livebiting" className=' bgfont'>live Bitting</Nav.Link>
                            <Nav.Link href="/futurebiting" className=' bgfont'>Future Biting</Nav.Link>
                            <Nav.Link href="/contact" className=' bgfont'>Contact</Nav.Link>
                        </Nav>
                        <div className="navbar-buttons">
                            {user ? (
                                <>
                                    <Link to={userType === 'User' ? '/userdashboard' : '/companydashboard'} className='me-3 text-success'>
                                        Hello, {user.username}
                                    </Link>
                                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="success" className="me-2" href="/login">Login</Button>
                                    <Button variant="outline-success" href='/signup'>Sign Up</Button>
                                </>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;
