import React from 'react';
import { Paper, Box } from '@mui/material';
import ProductProvider from './contexts/product-context';
import Filters from './home-page-filters';
import Header from './home-page-header';
import BookGridPageProducts from './book-grid-page-products';

const BookGridPage = () => {
  return (
    <ProductProvider>
      {/* <Paper
        sx={{
          width: '100%',
          height: '250px',
          mb: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        elevation={5}
      /> */}
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
          <BookGridPageProducts />
        </Box>
      </Box>
    </ProductProvider>
  );
};

export default BookGridPage;
