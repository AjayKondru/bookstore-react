// src/components/UserProfile.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
    const { auth } = useContext(AuthContext);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('/api/auth/updateProfile', {
            headers: { Authorization: `Bearer ${auth?.token}` }
        }).then(response => {
            setUser(response.data);
        });
    }, [auth]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/auth/getUser', user, {
            headers: { Authorization: `Bearer ${auth?.token}` }
        }).then(response => {
            alert('Profile updated successfully');
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={user.firstName || ''} onChange={handleChange} placeholder="First Name" />
            <input type="text" name="lastName" value={user.lastName || ''} onChange={handleChange} placeholder="Last Name" />
            <input type="email" name="email" value={user.email || ''} onChange={handleChange} placeholder="Email" />
            <input type="text" name="address" value={user.address || ''} onChange={handleChange} placeholder="Address" />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default UserProfile;
