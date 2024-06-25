import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/online-shopping.png';
import cart from '../Assets/shopping-cart.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const{getTotalCartItems}=useContext(ShopContext);
  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Fashion Flair Logo" />
        <p>FASHION FLAIRE</p>
      </div>
      <ul className="nav-menu">
        <li className={menu === "shop" ? "active" : ""} onClick={() => handleMenuClick("shop")}>
          <Link to="/shop">Shop</Link>
        </li>
        <li className={menu === "men" ? "active" : ""} onClick={() => handleMenuClick("men")}>
          <Link to="/men">Men</Link>
        </li>
        <li className={menu === "women" ? "active" : ""} onClick={() => handleMenuClick("women")}>
          <Link to="/women">Women</Link>
        </li>
        <li className={menu === "kids" ? "active" : ""} onClick={() => handleMenuClick("kids")}>
          <Link to="/kids">Kids</Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
        :<button><Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</Link></button>}
        
        
        <Link to="/cart"><img src={cart} alt="Cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
