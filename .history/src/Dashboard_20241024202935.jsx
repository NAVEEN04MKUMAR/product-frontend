// src/file/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2>Choose a Feature</h2>
            
                <li>
                    <Link to="/register">
                        <button>register</button>
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <button>login</button>
                    </Link>
                </li>
                <li>
                    <Link to="/userdetails">
                        <button>userdetails</button>
                    </Link>
                </li>
                
        </div>
    );
};

export default Dashboard;
