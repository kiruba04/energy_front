import React from 'react';
import './HomeContent.css';
import { useNavigate } from 'react-router-dom';
import Bidtable from "../market/Bidtable"
const HomeContent = () => {
    const navigate = useNavigate();
    const handellogin =() =>
    {
        navigate('/login');
    }
    return (
        <div className="app-container">
            <header className="header">
                <h1>Power Trading Platform</h1>
                <p>Innovating the Future of Renewable Energy Trading</p>
            </header>

            <main className="main-content">
                <section className="hero">
                    <h2>Empowering Sustainable Energy Markets</h2>
                    <p>Join the revolution in renewable energy trading with our state-of-the-art platform.</p>
                    <button className="cta-button" onClick={handellogin}>Get Started</button>
                </section>

                <section className="highlights">
                    <div className="highlight">
                        <h3>Seamless Trading</h3>
                        <p>Our platform ensures smooth and secure transactions for all your energy trading needs.</p>
                    </div>
                    <div className="highlight">
                        <h3>Advanced Analytics</h3>
                        <p>Access real-time data and analytics to make informed decisions in the energy market.</p>
                    </div>
                    <div className="highlight">
                        <h3>Global Network</h3>
                        <p>Connect with leading energy producers and consumers worldwide.</p>
                    </div>
                </section>
            </main>

            <div className="app-container">
                <header className="header">
                    <h1>Power Exchange Dashboard</h1>
                </header>

                <main className="dashboard">
                    <section className="market-overview">
                        <h2>Market Overview</h2>
                        <div className="overview-cards">
                            <div className="overview-card">
                                <h3>Current Price</h3>
                                <p>$52.30 / MWh</p>
                            </div>
                            <div className="overview-card">
                                <h3>Daily Volume</h3>
                                <p>1200 MWh</p>
                            </div>
                            <div className="overview-card">
                                <h3>Total Trades</h3>
                                <p>450</p>
                            </div>
                        </div>
                    </section>

                        <Bidtable/>

                    <section className="user-activity">
                        <h2>User Activity</h2>
                        <ul className="activity-list">
                            <li>User A executed a trade of 100 MWh at $52.00</li>
                            <li>User B posted a new bid at $51.90 for 200 MWh</li>
                            <li>User C completed a sell order of 150 MWh at $52.10</li>
                        </ul>
                    </section>
                </main>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h2>Quick Links</h2>

                    </div>
                    <div className="footer-section">
                        <h2>Contact Us</h2>
                        <p>Email: support@powertrading.com</p>
                        <p>Phone: +1-234-567-8901</p>
                    </div>
                    <div className="footer-section">
                        <h2>Follow Us</h2>

                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Power Trading Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomeContent;
