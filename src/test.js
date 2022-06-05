import React from 'react';
import './loader/loader.css'

const Loader = () => {
    return (
        <center>
        <figure>
            <div className="dot white"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </figure>
        </center>
    );
};

export default Loader;