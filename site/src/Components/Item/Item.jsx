import React from 'react';
import './Item.css';

const Item = ({ id,category,image, name, new_price, old_price }) => {
  return (
    <div className="item">
     <a href={`/product/${id}`}> <img src={image} alt={name} className="item-image" /></a>
      <div className="item-name">{name}</div>
      <div className="item-prices">
        <span className="item-price-new">{new_price}</span>
        {old_price && <span className="item-price-old">${old_price}</span>}
      </div>
    </div>
  );
};

export default Item;
