import React from 'react';
import onlineShoppingIcon from '../Assets/online-shopping.png';
import userIcon from '../Assets/user.png';
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <img src={onlineShoppingIcon} alt="Online Shopping Icon" height="40px" width="40px" />
        <span className="center" id="lol">FASHION FLAIRE</span>
      </div>
      <div className="admin-panel">
        <h3>Admin Panel</h3>
        <div id="root"></div>
      </div>
      <div className="right">
        <img src={userIcon} alt="User Icon" height="40px" width="40px" />
      </div>
    </div>
  );
};

export default Navbar;
