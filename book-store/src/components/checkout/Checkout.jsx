import React, { useEffect, useState } from "react";
import { selectCart } from "../../store/cart";
import { selectAuth } from "../../store/auth";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import APIService from "../../services/api-service";
import { Paper, TableContainer, Table, TableRow, TableHead, Button, TableBody, Typography} from "@mui/material";

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const { cart } = useSelector(selectCart);
  const { user } = useSelector(selectAuth);

  const calculateTotalSum = (items) => {
    let price = 0;
    items.forEach((x) => {
      const itemPrice = x.price.replace(" EUR", "");
      price += parseFloat(itemPrice) * x.qty;
    });

    return price;
  };

  const handleBuy = () => {
    let price = 0;
    cart.forEach((x) => {
        const itemPrice = x.price.replace(" EUR", "");
        price += parseFloat(itemPrice) * x.qty;
      });
    
      APIService.addOrder({
          id: "pim",
          qty: cart.length,
          totalAmount: price,
          status: 'COMPLETED',
          userId: user.id
      });
  }

  useEffect(() => {
    setTotalPrice(calculateTotalSum(cart));
  }, [cart]);

  return (
    // <>
    //   <div>
    //     <div>
    //       {cart.map((item) => (
    //         <>
    //           <CheckoutItem key={item.id} item={item} />
    //         </>
    //       ))}
    //     </div>
    //     <div>TOTAL PRICE: {totalPrice}</div>
    //   </div>
    //   <button onClick={() => handleBuy()}>BUY THIS NOW</button>
    // </>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        </TableRow>
      </TableHead>
      <TableBody>
        {cart.map((row) => (
            <CheckoutItem
              item={row}
            />
        ))}
      </TableBody>
    </Table>
    <Typography variant="h6" sx={{textAlign: 'end'}}>
    TOTAL PRICE: {totalPrice.toFixed(2)}
    </Typography>
    <Button
        variant="contained"
        sx={{ width: 150, height: 50, mb: '20px' }}
        onClick={() => handleBuy()}
      >
        ORDER
      </Button>
  </TableContainer>

  );
};

// const mapStateToProps = (state) => {
//   return {
//     cart: state.shop.cart,
//   };
// };

export default Checkout;
