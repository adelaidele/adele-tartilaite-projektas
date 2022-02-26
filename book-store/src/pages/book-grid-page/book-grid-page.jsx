import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Header from './home-page-header';
import Filters from './home-page-filters';
import ProductProvider from './contexts/product-context';
import BookGridPageGrid from '../../pages/book-grid-page/book-grid-page-grid';
import BookGridPageCard from '../../pages/book-grid-page/book-grid-page-card';
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
    <ProductProvider>
      <Paper
        sx={{
          width: '100%',
          height: '250px',
          mb: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        elevation={5}
      >
        <Typography variant="h2" gutterBottom component="div">
          Browse our selection of books!
        </Typography>
      </Paper>
      <Box>
        <Header />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 3,
            mt: 3,
          }}
        >
          <Filters />
          <BookGridPageGrid>
            {books.map((book) => (
              <BookGridPageCard key={book.id} {...book}></BookGridPageCard>
            ))}
          </BookGridPageGrid>
        </Box>
      </Box>
    </ProductProvider>
  );
};

export default BookGridPage;
