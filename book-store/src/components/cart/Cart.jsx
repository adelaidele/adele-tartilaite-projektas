import React, { useEffect, useState } from 'react';
import { adjustQty, selectCart } from '../../store/cart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { removeFromCart } from '../../store/cart';
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  Button,
  TableBody,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = useSelector(selectCart);
  const navigate = useNavigate();
  const navigateToAddBook = () => navigate(`/checkout`);

  const dispatch = useDispatch();
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const calculateTotalSum = (items) => {
    let price = 0;
    items.forEach((x) => {
      const itemPrice = x.price.replace(' EUR', '');
      price += parseFloat(itemPrice) * x.qty;
    });

    return price;
  };

  const handleQtyChange = (item) => {
    dispatch(adjustQty(item));
  };

  useEffect(() => {
    setTotalPrice(calculateTotalSum(cart));
  }, [cart]);

  return (
    <TableContainer
      component={Paper}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'column', alignItems: 'flex-end', p: 5 }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <CartItem
              key={row.id}
              item={row}
              onDelete={handleRemoveFromCart}
              onQtyChange={handleQtyChange}
            />
          ))}
        </TableBody>
      </Table>
      <Typography variant="h6" sx={{ textAlign: 'end' }}>
        TOTAL PRICE: {totalPrice.toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        sx={{ width: 150, height: 50, m: '20px 0' }}
        onClick={navigateToAddBook}
      >
        CHECKOUT
      </Button>
    </TableContainer>
  );
};

export default Cart;
