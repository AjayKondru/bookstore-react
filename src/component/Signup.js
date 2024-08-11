// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/auth/register', user)
            .then(response => {
                alert('Registration successful!');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
