import React, { useContext } from 'react';
import { ProductContext } from './contexts/product-context';
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Fab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/cart';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material';
import { theme } from '../../libs/ThemeCreator';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/auth';
import BookGridPageGrid from './book-grid-page-grid';
import BookGridPageCard from './book-grid-page-card';

const BookGridPageProducts= () => {
    const {books} = useContext(ProductContext);
  return (
    <BookGridPageGrid>
      {books.map((book) => (
        <BookGridPageCard key={book.id} {...book}></BookGridPageCard>
      ))}
    </BookGridPageGrid>
  );
};

export default BookGridPageProducts;
