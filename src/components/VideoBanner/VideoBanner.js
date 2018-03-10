import React from 'react';
import './VideoBanner.css';
import { Link } from 'react-router-dom';
import video from '../../assets/videoBanner2.mov';


const VideoBanner = () => {
    return (
        <div className="title-content-container">
            <video id="my-video" className="video" autoPlay="autoplay" loop="loop" muted="" width="300" height="150">
                <source src={video} type="video/mp4" />
            </video>
            <h1 className="title-content-text">GENERIC SHOP TITLE</h1>
            <span />
            <h4 className="title-content-text">"Leading innovator in E-Commerce" -Prestige World Wide</h4>
            <span />
            <div>
                <Link to="/search"><button className="shop-button">SHOP NOW</button></Link>
            </div>
        </div>
    );
};

export default VideoBanner;