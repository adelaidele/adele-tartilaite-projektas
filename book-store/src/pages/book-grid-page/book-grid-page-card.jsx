import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookGridPageImage from './book-grid-page-image';

const BookGridPageCard = ({ title, author, genre, price, img, id }) => {
  const navigate = useNavigate();

  const navigateToSingleBook = useCallback(() => {
    navigate(`/book/${id}`);
  }, [id]);

  return (
    <Box sx={{ border: '2px solid black' }}>
      <Box>
        <Box onClick={navigateToSingleBook}>
          <BookGridPageImage img={img} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
          <Typography>Price: {price}</Typography>
          <Typography>Author: {author}</Typography>
          <Typography>Genre: {genre}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookGridPageCard;
