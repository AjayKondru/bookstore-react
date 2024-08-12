// src/components/BookDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});

    useEffect(() => {
        axios.get(`/api/books/${id}`).then((response) => {
            setBook(response.data);
        });
    }, [id]);

    return (
        <div>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <p>ISBN: {book.isbn}</p>
            <p>Price: ${book.price}</p>
        </div>
    );
};

export default BookDetails;
