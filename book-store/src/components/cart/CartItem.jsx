import React, { useState } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CartItem = ({ item, onQtyChange, onDelete }) => {
  const [input, setInput] = useState(item.qty);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    onQtyChange({ ...item, qty: e.target.value });
  };

  return (
    <TableRow
      key={item.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="center">
        <Button onClick={() => onDelete(item.id)}>
          <CloseIcon />
        </Button>
      </TableCell>
      <TableCell component="th">
        <img
          style={{ width: '50px', height: '100px' }}
          src={item.img}
          alt={item.title}
        />
      </TableCell>
      <TableCell align="right">{item.title}</TableCell>
      <TableCell align="right">
        {' '}
        <input
          min="1"
          type="number"
          id="qty"
          name="qty"
          value={input}
          onChange={onChangeHandler}
        />
      </TableCell>
      <TableCell align="right">{item.price}</TableCell>
    </TableRow>
  );
};

export default CartItem;
