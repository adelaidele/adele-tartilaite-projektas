import React, { useEffect, useState, useCallback } from 'react';
import { selectCart } from '../../store/cart';
import { selectAuth } from '../../store/auth';
import { useSelector } from 'react-redux';
import CheckoutItem from './CheckoutItem';
import APIService from '../../services/api-service';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  Button,
  TableBody,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const { cart } = useSelector(selectCart);
  const { user } = useSelector(selectAuth);

  const [openNotification, setOpenNotification] = useState(false);

  const handleClose = () => {
    setOpenNotification(false);
  };

  const navigate = useNavigate();

  const navigateToBookGrid= useCallback(() => {
    navigate(`/books`);
  }, [navigate]);

  const calculateTotalSum = (items) => {
    let price = 0;
    items.forEach((x) => {
      const itemPrice = x.price.replace(' EUR', '');
      price += parseFloat(itemPrice) * x.qty;
    });

    return price;
  };

  const handleBuy = () => {
    let price = 0;
    cart.forEach((x) => {
      const itemPrice = x.price.replace(' EUR', '');
      price += parseFloat(itemPrice) * x.qty;
    });

    APIService.addOrder({
      qty: cart.length,
      totalAmount: price,
      status: 'COMPLETED',
      userId: user.id,
    });

    setOpenNotification(true);
    setTimeout(() => {
      navigateToBookGrid();
    }, 2000);
  };

  useEffect(() => {
    setTotalPrice(calculateTotalSum(cart));
  }, [cart]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <CheckoutItem item={row} />
          ))}
        </TableBody>
      </Table>
      <Typography variant="h6" sx={{ textAlign: 'end' }}>
        TOTAL PRICE: {totalPrice.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        sx={{ width: 150, height: 50, mb: '20px' }}
        onClick={() => handleBuy()}
      >
        ORDER
      </Button>
      <Snackbar
        open={openNotification}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Order confirmed!
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default Checkout;
