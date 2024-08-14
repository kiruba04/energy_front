import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import Button from 'react-bootstrap/Button';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://energy-backend-ww4p.onrender.com/api/user/login', {
                email: username,
                password,
            }, {
                withCredentials: true, // This will ensure that cookies are sent with the request
            });

            if (response.status === 200) {
                // Store the token in localStorage
                localStorage.setItem('user', JSON.stringify( response.data.user));
                localStorage.setItem('usertype',response.data.userType);

                // Redirect based on userType
            navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data.message : error.message);
            // Handle login failure (e.g., display an error message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bodybg'>
            <div className='d-flex justify-content-center align-items-center min-vh-100 bg-dark'>
                <div className='bg-light p-4 rounded shadow-lg' style={{ maxWidth: '400px', width: '100%' }}>
                    <h1 className='text-center mb-4'>
                        Login
                        <span className='text-primary'> GEX</span>
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='username' className='form-label'>
                                Username
                            </label>
                            <input
                                type='text'
                                id='username'
                                className='form-control'
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                className='form-control'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Link to='/userreg' className='d-block text-center mb-3 text-decoration-none text-primary'>
                            {"Don't"} have an account?
                        </Link>

                        <Button
                            type='submit'
                            className='btn w-100'
                            disabled={loading}
                            variant="outline-success"
                        >
                            {loading ? <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> : 'Login'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
