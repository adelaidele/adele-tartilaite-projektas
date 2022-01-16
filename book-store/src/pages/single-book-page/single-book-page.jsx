import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIService from "../../services/api-service";
import SingleBookPageCard from "./single-book-page-card";

const SingleBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    (async () => {
      const fetchedBook = await APIService.fetchFormatedBook(id);
      setBook(fetchedBook);
    })();
  }, []);
  
  return (
    <SingleBookPageCard
      id={book.id}
      title={book.title}
      author={book.author}
      price={book.price}
      genre={book.genre}
      img={book.img}
    />
  );
};

export default SingleBookPage;
