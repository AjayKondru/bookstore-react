// src/components/OrderHistory.js
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const navigate = useNavigate();
    const { orders } = useContext(OrderContext);
    const handleButtonClick1 = () => {
   
        navigate('/booklist');
    };

    const signout = () => {   
      localStorage.removeItem('token');
      navigate('/login');
    };
   

    return (
        <div>
            <h2>Your Order History</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            <div>
                                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                            </div>
                            <div>
                                <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                            </div>
                            <div>
                                <strong>Order Status:</strong> {order.status}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
            <button onClick={handleButtonClick1}>Purchase Books</button>
            <button onClick={signout}>Sign Out</button>
        </div>
    );
};

export default OrderHistory;
