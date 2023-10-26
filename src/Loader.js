import React from 'react';
import './Loader.css';
import { Audio } from 'react-loader-spinner';
const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader"></div>
            <span className='loading'>Loading data please wait</span>
        </div>
    );
};

export default Loader;
