// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const savedAuth = JSON.parse(localStorage.getItem('auth'));
        if (savedAuth) setAuth(savedAuth);
    }, []);

    const login = (data) => {
        setAuth(data);
        localStorage.setItem('auth', JSON.stringify(data));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('auth');
    };

    const isAuthenticated = () => !!auth;
    const isAdmin = () => auth?.roles?.includes('ADMIN');
    const isUser = () => auth?.roles?.includes('USER');

    return (
        <AuthContext.Provider value={{ auth, login, logout, isAuthenticated, isAdmin, isUser }}>
            {children}
        </AuthContext.Provider>
    );
};
