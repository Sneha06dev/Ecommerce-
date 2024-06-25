import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './ShopCategory.css'; // Import CSS file for styling
import Item from '../Components/Item/Item';
//When you want to display all data replace allproduct with all and in ShopContext.jsx also make changes
const ShopCategory = (props) => {
  const { allproduct } = useContext(ShopContext);

  useEffect(() => {
    console.log('All products:', allproduct); // Log to check data
  }, [allproduct]);

  return (
    <div className='shop-category'>
      {/* Banner with gradient background */}
      <div className='gradient-overlay'></div>
      <div className='banner-content'>
        <h1>Flat 50% OFF</h1>
        <p>On {`${props.category.charAt(0).toUpperCase()}${props.category.slice(1)} Collections`}</p>
      </div>

      <div className='shopcategory-indexSort'>
        <p>Showing best matched results</p>
      </div>
      <div className='shopcategory-sort'>
        Sort by &gt;
      </div>

      <div className='shopcategory-products'>
        {allproduct && allproduct.length > 0 ? (
          allproduct.map((item) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })
        ) : (
          <p>No items available in this category</p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
