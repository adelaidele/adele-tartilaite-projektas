import React from "react";
import { TableCell, TableRow } from "@mui/material";
const CartItem = ({ item }) => {
  return (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th">
        <img
          style={{ width: "50px", height: "100px" }}
          src={item.img}
          alt={item.title}
        />
      </TableCell>
      <TableCell align="right">{item.title}</TableCell>
      <TableCell align="right">{item.qty}</TableCell>
      <TableCell align="right">{item.price}</TableCell>
    </TableRow>
  );
};

export default CartItem;
