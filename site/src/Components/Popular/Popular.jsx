import React from 'react';
import './Popular.css';
import data_product from '../Assets/data';

const Popular = () => {
    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr/>
            <div className='popular-item'>
                {data_product.slice(0, 4).map((item) => (
                    <div key={item.id} className='item'>
                        <img src={item.image} alt={item.name} />
                        <p className='name'>{item.name}</p>
                        <p className='price'>
                            <span className='new-price'>New Price: ${item.new_price}</span>
                            <br></br>
                            <span className='old-price'>Old Price:<span className='old-pricely'>${item.old_price}</span> </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Popular;
