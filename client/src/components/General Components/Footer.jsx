import React from 'react';
import "../../styles/General Components/Footer.css"
// Icons
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";




const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__wrapper">
                <div className="footer__content">
                    <div className="first-col">
                        <h1>GoRecycle</h1>
                        <p>The best place to buy and sell recycled items.</p>
                        <div className="footer__socials">
                            <BsTwitterX className='footer__social' />
                            <FaLinkedin className='footer__social'/>
                            <FaFacebookSquare className='footer__social'/>
                            <FaGoogle className='footer__social'/>

                        </div>
                    </div>
                    <div className="second-col">
                        <h4>WEBSITE</h4>
                        <p>About Us</p>
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>
                        <p>Contact Us</p>
                    </div>
                    <div className="third-col">
                        <h4>EXPLORE</h4>
                        <p>Buy Items</p>
                        <p>Sell Items</p>
                    </div>
                    <div className="fourth-col">
                        <h4>LINKS</h4>
                        <p>Messages</p>
                        <p>Offers</p>
                        <p>Favorites</p>
                    </div>



                </div>

            </div>

        </footer>
    );
}

export default Footer;
