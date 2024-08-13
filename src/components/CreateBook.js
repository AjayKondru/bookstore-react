import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const roles = decodedToken.role;
            alert(roles);
            setIsAdmin(roles.includes('ADMIN'));
        }
    }, []);
    const handleButtonClick = () => {
   
        navigate('/booklist');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            alert('You do not have permission to perform this action.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                '/api/books/create',
                { title, author, description, price },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Book created successfully!');
            navigate('/booklist'); 
        } catch (error) {
            console.error('Error creating book:', error);
            alert('Failed to create the book.');
            navigate('/booklist');
        }
    };

    return (
        <div>
            {isAdmin ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Create Book</button>
                </form>
            ) : (
                <p>You do not have permission to access this page
                
                <button onClick={  handleButtonClick }>Go to Book List</button> 
                </p>
            )}
        </div>
    );
};

export default CreateBook;
