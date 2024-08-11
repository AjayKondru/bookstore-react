// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Signup from './components/Signup';
import Login from './components/Login';
import BookList from './components/BookList';
import UserProfile from './components/UserProfile';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <OrderProvider>
                    <Router>
                        <div>
                            <Routes>
                                <Route path="/" element={<BookList />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                                <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                                <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
                            </Routes>
                        </div>
                    </Router>
                </OrderProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
