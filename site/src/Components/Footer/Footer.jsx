import React from 'react';
import './Footer.css';
import logo from '../Assets/online-shopping.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={logo} alt="Company Logo" className="logo" />
                <p>FASHION FLAIRE</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Product</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
                </ul>
           
            <div className="footer-copyright">
                <p>Copyright &copy; 2024 - All Rights Reserved</p>
                <p>Created By: Sneha Rastogi</p>
            </div>
        </footer>
    );
}

export default Footer;
