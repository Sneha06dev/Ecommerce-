import React from 'react';
import './Hero.css'; // Assuming you have some CSS for styling
import woman from '../Assets/woman.png'
import arrow from '../Assets/right-arrow.png'
import model from '../Assets/model.png'
const Hero = () => {
  return (
   <div className="hero">
          <div className="hero-left">
              <p>ELEVATE</p>
              <p>YOUR </p> 
              <p>WARDROBE</p> 
          <div>
          <div className="woman-icon">
             
              <img src={woman} alt="" />
          </div>
          <div className="tagline">
          <p>Trendy</p>
          <p>Affordable</p>
          <p>Yours</p>
        </div>
      </div><div className='heo-latest-btn'>
              <div>Latest Collection</div>
              <img src={arrow} alt="" />
          </div></div>
          <div className="hero-right">
            <img src={model} alt=""/>
          </div>
          </div>
          
  );
};

export default Hero;
