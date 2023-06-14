import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='card-notfound'>
            <h2>404 | Not Found</h2>
            <button id="btn" onClick={handleBack} data-testid="back">Go Back</button>
        </div>
    );
};

export default NotFound;
