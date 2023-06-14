import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return <>
        <div className='home-container'>
            <h2>Welcome to Student Portal</h2>
            <Link to="/student">
                <button id="btn" data-testid="student-btn">All Student</button>
            </Link>
        </div>
    </>
};

export default Home;
