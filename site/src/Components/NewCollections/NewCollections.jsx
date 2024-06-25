import React, { useEffect, useState } from 'react';
import './NewCollections.css';
// import data_product from '../Assets/new';

const NewCollections = () => {

    const[new_c,setnew_c]=useState([]);
   
    useEffect(()=>{
        fetch('http://localhost:4000/newc')
        .then((response)=>response.json())
        .then((data)=>setnew_c(data));        
    },[])
    


    return (
        <div className='new-collections'>
            <h1 className='new-collections-title'>LATEST TRENDS</h1>
            <h2 className='new-collections-subtitle'>Fresh Arrivals</h2>
            <hr className='new-collections-divider'/>
            <div className='new-collections-items'>
                {new_c.slice(0, 6).map((item) => (
                    <div key={item.id} className='new-collections-item'>
                        <img src={item.image} alt={item.name} className='item-image'/>
                        <p className='item-name'>{item.name}</p>
                        <p className='item-price'>
                            <span className='new-price'>New Price: ${item.new_price}</span>
                            <br/>
                            <span className='old-price'>Old Price: <span className='old-price-strike'>${item.old_price}</span></span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewCollections;
