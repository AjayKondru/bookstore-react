// src/components/OrderHistory.js
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

const OrderHistory = () => {
    const { orders } = useContext(OrderContext);

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
        </div>
    );
};

export default OrderHistory;
