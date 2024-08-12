// src/context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (auth) {
            axios.get('/api/cart', {
                headers: { Authorization: `Bearer ${auth.token}` }
            }).then(response => {
                setCartItems(response.data);
            });
        }
    }, [auth]);

    const addToCart = (bookId, quantity) => {
        axios.get('/api/cart/add', {params:{ bookId:bookId, quantity:quantity} }, {
            headers: { Authorization: `Bearer ${auth.token}` }
        }).then(response => {
            setCartItems([...cartItems, response.data]);
        });
    };

    const removeFromCart = (cartItemId) => {
        axios.delete(`/api/cart/remove/${cartItemId}`, {
            headers: { Authorization: `Bearer ${auth.token}` }
        }).then(() => {
            setCartItems(cartItems.filter(item => item.id !== cartItemId));
        });
    };

    const clearCart = () => {
        axios.delete('/api/cart/clear', {
            headers: { Authorization: `Bearer ${auth.token}` }
        }).then(() => {
            setCartItems([]);
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
