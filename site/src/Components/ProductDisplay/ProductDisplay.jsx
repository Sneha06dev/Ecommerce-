import React, { useContext } from 'react';
import './ProductDisplay.css'; // Adjust the path as per your project structure
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ( props ) => {

  const { product}=props;
  const {addToCart}= useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {/* Render multiple images vertically */}
          <img src={product.image} alt="Product Thumbnail 1" />
          <img src={product.image} alt="Product Thumbnail 2" />
          <img src={product.image} alt="Product Thumbnail 3" />
        </div>
        <div className="productdisplay-img">
          {/* Render main image */}
          <img className='productdisplay-main-img' src={product.image} alt="Main Product" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <div>XL</div>
          <div>XXL</div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          Category: {product.category}
        </p>
        <p className="productdisplay-right-category">
          Tags: Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
