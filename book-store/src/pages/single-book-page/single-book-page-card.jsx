import React from 'react';
import { Box, Typography } from '@mui/material';
import BookGridPageImage from '../book-grid-page/book-grid-page-image';
import '../../index.css';

const SingleBookPageCard = ({ title, author, genre, price, img }) => (
  <Box sx={{ border: '2px solid black' }}>
    <Box>
      <Box>
        <BookGridPageImage img={img} />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
        <Typography>Author: {author}</Typography>
        <Typography>Genre: {genre}</Typography>
        <Typography>Price: {price}</Typography>
      </Box>
    </Box>
  </Box>
);

export default SingleBookPageCard;
