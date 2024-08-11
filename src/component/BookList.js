// src/components/BookList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get('/api/books').then(response => {
            setBooks(response.data);
        });
    }, []);

    const handleAddToCart = (bookId) => {
        addToCart(bookId, 1); // Add one book to the cart
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
        </div>
    );
};

export default BookList;
