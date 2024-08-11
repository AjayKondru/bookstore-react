// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const { checkout } = useContext(OrderContext);

    const handleCheckout = () => {
        checkout().then(() => {
            clearCart();
            alert('Order placed successfully!');
        }).catch(err => {
            console.error('Checkout failed', err);
            alert('Checkout failed. Please try again.');
        });
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.book.title} - {item.quantity} pcs
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleCheckout}>Checkout</button>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
};

export default Cart;
