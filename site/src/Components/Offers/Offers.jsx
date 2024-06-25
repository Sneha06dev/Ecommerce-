import React from 'react';
import model2 from '../Assets/model2.png';

const Offers = () => {
    return (
        <div className='offers'>
            <style>
                {`
                .offers {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 40px;
                    margin: 20px auto;
                    max-width: 900px;
                    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
                    border-radius: 15px;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }
                
                .offers-left {
                    flex: 1;
                    padding: 20px;
                }
                
                .offers-left h1 {
                    font-size: 3em;
                    color: #333;
                    margin: 0;
                    font-family: 'Arial', sans-serif;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
                }
                
                .offers-left p {
                    font-size: 1.5em;
                    color: #555;
                    margin: 15px 0 25px;
                    font-family: 'Arial', sans-serif;
                }
                
                .offers-left button {
                    padding: 15px 30px;
                    font-size: 1.2em;
                    color: #fff;
                    background-color: #007bff;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                    font-family: 'Arial', sans-serif;
                }
                
                .offers-left button:hover {
                    background-color: #0056b3;
                    transform: translateY(-2px);
                }
                
                .offers-right {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .offers-right img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 15px;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }
                `}
            </style>
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLER PRODUCTS</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={model2} alt="Model" />
            </div>
        </div>
    );
}

export default Offers;
