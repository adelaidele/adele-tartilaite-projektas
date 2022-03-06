import React, { useCallback } from 'react';
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

const BookGridPageCard = ({ title, author, genre, price, img, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(selectAuth);

  const navigateToSingleBook = useCallback(() => {
    navigate(`/books/${id}`);
  }, [id]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const StyledCardInfo = styled(Typography)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
  }));

  return (
    <Card sx={{ display: 'flex' }} elevation={5}>
      <CardMedia
        sx={{ objectFit: 'contain', width: 250 }}
        component="img"
        height="250"
        image={img}
        alt="#"
      />
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <CardContent sx={{ height: 160 }}>
          <Typography
            title={title}
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              fontWeight: 600,
              height: 48,
            }}
            mb={'5px'}
          >
            {title}
          </Typography>
          <StyledCardInfo>
            <span>Author: </span>
            <span>{author}</span>
          </StyledCardInfo>
          <StyledCardInfo>
            <span>Genre: </span>
            <span>{genre}</span>
          </StyledCardInfo>
          <StyledCardInfo>
            <span>Price:</span> <span>{price}</span>
          </StyledCardInfo>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', padding: '16px' }}>
          <Fab
            onClick={navigateToSingleBook}
            size="small"
            sx={{
              backgroundColor: theme.palette.background.default,
              mr: '10px',
            }}
          >
            <HelpOutlineIcon style={{ fill: theme.palette.primary.light }} />
          </Fab>
          {loggedIn ? (
            <Fab
              onClick={() =>
                handleAddToCart({ title, author, genre, price, img, id })
              }
              size="small"
              sx={{ backgroundColor: theme.palette.background.default }}
            >
              <AddShoppingCartIcon
                style={{ fill: theme.palette.primary.light }}
              />
            </Fab>
          ) : null}
        </CardActions>
      </div>
    </Card>
  );
};

export default BookGridPageCard;
