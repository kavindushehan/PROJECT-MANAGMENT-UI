import React from 'react';
import './loader.css'

const Loader = () => {
    return (
        <figure>
            <div className="dot white"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </figure>
    );
};

export default Loader;