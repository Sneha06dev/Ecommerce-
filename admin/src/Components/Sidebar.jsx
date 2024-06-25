import React from 'react';
import { Link } from 'react-router-dom';
import addProductIcon from '../Assets/shopping-cart.png';
import productListIcon from '../Assets/schedule.png';
import './Sidebar.css'

function Sidebar() {
  return (
    <div className='sidebar'>
      <Link to='/addproduct' style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='sidebar-item'>
          <img src={addProductIcon} alt='Add Product Icon' height='50px' width='50px' />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to='/allproducts' style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='sidebar-item'>
          <img src={productListIcon} alt='Product List Icon' height='50px' width='50px' />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
