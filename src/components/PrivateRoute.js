// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, admin = false }) => {
    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (admin && !isAdmin()) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
