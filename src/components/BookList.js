import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useNavigate } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('/api/books/fetchAll',
           { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            setBooks(response.data);
        });
    }, []);

    const handleAddToCart = (bookId) => {
        addToCart(bookId, 1); 
    };
    const handleButtonClick = () => {
   
        navigate('/cart');
    };
    const handleButtonClick1 = () => {
   
        navigate('/createbook');
    };

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} - ${book.price}
                        <button onClick={() => handleAddToCart(book.id)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <div>
             <button onClick={  handleButtonClick1 }>Add Book</button> 
        </div>
            <div>
             <button onClick={  handleButtonClick }>Go to Cart</button> 
        </div>
        </div>
       
        
    );
};

export default BookList;
