import React from 'react';
import "../styles/Footer.css"
const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-content">
                <h1>Marketplace</h1>
                <div className="footer-elements">
                <div className="footer-element">
                    <h3>Sell</h3>
                    <p>Post an item</p>
                </div>
                <div className="footer-element">
                    <h3>Buy</h3>
                    <p>Buy an item</p>
                </div>
                </div>
                
            </div>
        </footer>
    );
}

export default Footer;
