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
import { Navigate } from 'react-router';
import axios from 'axios';
import CreateBook from './components/CreateBook';
axios.defaults.baseURL = 'http://localhost:8080';
function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <OrderProvider>
                    <Router>
                        <div>
                            <Routes>
                            <Route path="/" element={<Navigate to="/signup" replace={true} />} />
                                <Route path="/booklist" element={<BookList />} />
                                <Route path="/createbook" element={<CreateBook />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/orders" element={<OrderHistory />} />
                            </Routes>
                        </div>
                    </Router>
                </OrderProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
