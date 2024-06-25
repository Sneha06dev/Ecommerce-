import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Breadcrumb from '../Components/Breadcrumb/Breadcrumb';
import Item from '../Components/Item/Item';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import { ShopContext } from '../Context/ShopContext';

const Product = () => {
  var { productId } = useParams(); // Ensure useParams() is imported correctly
  const { allproduct } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("Product ID from URL:", productId); // Check if productId is defined here

    if (allproduct && allproduct.length > 0) {
      const foundProduct = allproduct.find(item => item.id === Number(productId));
      console.log("Found Product:", foundProduct); // Check if the correct product is found
      setProduct(foundProduct);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [allproduct, productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrumb product={product} />
      <Item item={product} />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
