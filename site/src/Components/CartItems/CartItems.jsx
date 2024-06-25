import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';

const CartItems = () => {
    const { allproduct, cartItems, removeFromCart } = useContext(ShopContext);

    const calculateSubtotal = () => {
        return allproduct.reduce((total, item) => {
            return total + (item.new_price * (cartItems[item.id] || 0));
        }, 0).toFixed(2);
    };

    const subtotal = calculateSubtotal();

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {allproduct.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format">
                                <img src={e.image} alt='' className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <span className='cartitems-quantity'>{cartItems[e.id]}</span>
                                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                                <button className='decrease-quantity' onClick={() => { removeFromCart(e.id) }}>-</button>
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${subtotal}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${subtotal}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
