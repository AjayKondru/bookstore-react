// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/auth/login', user)
            .then(response => {
                login(response.data);
                           localStorage.setItem('token',response.data.token);
                axios.defaults.headers.get['Authorization'] = 'Bearer ' + response.data.token;
                navigate("/booklist"); 
            })
            .catch(error => {
                alert('Invalid Credentials');
                console.error('There was an error!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
