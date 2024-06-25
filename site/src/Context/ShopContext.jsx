import React, { createContext, useState, useEffect } from 'react';
// import all from '../Components/Assets/all'; // Adjust the path as per your project structure

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  const savedCart = localStorage.getItem('cart');
  console.log('Saved cart:', savedCart);
  if (savedCart) {
    return JSON.parse(savedCart);
  } else {
    const cart = {};
    // all.forEach(item => {
      for(let i=0;i<301;i++){
      cart[i] = 0;
    }
   
  // );
    return cart;
  }
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
   const [allproduct,setallproduct]=useState([]);

   useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>setallproduct(data))
  },[])

  


  
  const addToCart = (itemID) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemID]: (prev[itemID] || 0) + 1 };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': authToken
        },
        body: JSON.stringify({ itemID })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Item added to cart:', data);
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
    } else {
      console.error('No auth token found');
    }
  };
  

  const removeFromCart = (itemID) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemID]: Math.max((prev[itemID] || 0) - 1, 0) };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getTotalCartItems=()=>{
    let totalItem=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        totalItem+=cartItems[item];
      }
    }
    return totalItem;
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const contextValue = {
    allproduct,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
