import React from 'react';
import "../../styles/General Components/Footer.css"
const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-content">
                
                <div className="footer-elements">
                <div className="footer-element">
                    <h3>Backend</h3>
                    <p>Rails</p>
                    <p>Ruby</p>
                    <p>PostgreSQL</p>
                </div>
                <div className="footer-element">
                    <h3>Frontend</h3>
                    <p>React</p>
                </div>
                <div className="footer-element">
                    <h3>Styling</h3>
                    <p>HTML</p>
                    <p>CSS</p>
                    <p>ReactIcons</p>
                </div>
                <div className="footer-element">
                    <h3>Future Features</h3>
                    <p>Real time notifications</p>
                   
                    
                </div>
                </div>
                
            </div>
            <h1>MarketPlace</h1>
        </footer>
    );
}

export default Footer;
