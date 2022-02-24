import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import BookGridPageGrid from './book-grid-page-grid';
import BookGridPageCard from './book-grid-page-card';
import APIService from '../../services/api-service';

const BookGridPage = () => {
  const emptyBooks = [...new Array(20)].map((_, id) => ({ id }));
  const [books, setBooks] = useState(emptyBooks);

  useEffect(() => {
    (async () => {
      const fetchedBooks = await APIService.fetchAllBooks();
      setBooks(fetchedBooks);
    })();
  }, []);

  return (
    <Box>
      <BookGridPageGrid>
        {books.map((book) => (
          <BookGridPageCard
            key={book.id}
            id={book.id}
            title={book.title}
            price={book.price}
            author={book.author}
            genre={book.genre}
            img={book.img}
          />
        ))}
      </BookGridPageGrid>
    </Box>
  );
};

export default BookGridPage;
