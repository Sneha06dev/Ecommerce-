import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
 import Footer from './Components/Footer/Footer';
import menpic from './Components/Assets/product_8.png'
import womenpic from './Components/Assets/product_7.png'
import kidpic from './Components/Assets/product_14.png'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/men" element={<ShopCategory modelimg={menpic} category="men" />} />
          <Route path="/women" element={<ShopCategory modelimg={womenpic}  category="women" />} />
          <Route path="/kids" element={<ShopCategory modelimg={kidpic} category="kids" />} />
          <Route path="/product" element={<Product />}/>
            <Route path="/product/:productId" element={<Product />} />
         
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
