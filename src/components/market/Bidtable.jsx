// components/BidTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported
import '../Company/Company.css'
const BidTable = () => {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await axios.get('https://energy-backend-ww4p.onrender.com/api/bids/getallbids');  // Fetch bids from the backend
                setBids(response.data);
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        };

        fetchBids();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4 headfont">Bids Table</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Product ID</th>
                            <th>Current Bid</th>
                            <th>Last Bidder</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map(bid => (
                            <tr key={bid._id}>
                                <td>{bid.productId}</td>
                                <td>Rs.{bid.currentBid.toFixed(2)}</td>
                                <td>{bid.lastBidder || 'N/A'}</td>
                                <td>{new Date(bid.endTime).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BidTable;
