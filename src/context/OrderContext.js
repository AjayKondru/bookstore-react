// src/context/OrderContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (auth) {
            axios.get('/api/orders', {
                headers: { Authorization: `Bearer ${auth.token}` }
            }).then(response => {
                setOrders(response.data);
            });
        }
    }, [auth]);

    const checkout = () => {
        return axios.post('/api/orders/checkout', null, {
            headers: { Authorization: `Bearer ${auth.token}` }
        }).then(response => {
            setOrders([...orders, response.data]);
            return response.data;
        });
    };

    return (
        <OrderContext.Provider value={{ orders, checkout }}>
            {children}
        </OrderContext.Provider>
    );
};
