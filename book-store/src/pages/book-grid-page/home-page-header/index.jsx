import React, { useContext } from 'react';
import { Typography, Paper, Button, Divider } from '@mui/material';
import { ProductContext } from '../contexts/product-context';

const HomePageHeader = () => {
  const { genres, selectedGenre, changeGenre } = useContext(ProductContext);
  return (
    <Paper
      sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}
      elevation={5}
    >
      {genres.map(({ id, title }, i) => (
        <React.Fragment key={title}>
          <Button
            variant="text"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textTransform: 'Capitalize',
            }}
            color={id === selectedGenre ? 'primary' : 'inherit'}
            onClick={() => changeGenre(id)}
          >
            <Typography>{title}</Typography>
          </Button>
          {i !== genres.length - 1 && (
            <Divider orientation="vertical" flexItem />
          )}
        </React.Fragment>
      ))}
    </Paper>
  );
};

export default HomePageHeader;
