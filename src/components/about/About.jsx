import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About Us</h1>
            </div>
            <div className="about-content">
                <h2>Our Mission</h2>
                <p>
                    At Greenwave energy exchange we are committed to revolutionizing the energy trading landscape by providing a seamless, transparent, and efficient platform for power companies to trade energy. Our mission is to empower businesses and individuals alike to access cleaner, more affordable energy solutions.
                </p>

                <h2>What We Do</h2>
                <p>
                    We provide a robust marketplace that connects energy producers with buyers, ensuring that every transaction is fair, secure, and beneficial to both parties. Our platform offers:
                </p>
                <ul>
                    <li>Real-time energy trading</li>
                    <li>Green energy certificate management</li>
                    <li>Advanced analytics and reporting</li>
                    <li>Secure blockchain-based transactions</li>
                    <li>Dedicated customer support</li>
                </ul>

                <h2>Our Vision</h2>
                <p>
                    Our vision is to lead the transition towards a sustainable energy future by creating a global marketplace where renewable energy is accessible to all. We strive to be at the forefront of innovation, leveraging cutting-edge technology to make energy trading as efficient and user-friendly as possible.
                </p>
            </div>
            <div className="about-quote">
                <p>"Empowering the world with clean, renewable energy."</p>
            </div>
        </div>
    );
};

export default About;
