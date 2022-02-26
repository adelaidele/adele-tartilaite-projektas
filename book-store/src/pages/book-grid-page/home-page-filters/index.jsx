import React, { useContext } from 'react';
import { Paper, AppBar } from '@mui/material';
import RangeFilter from './range-filter';
import { ProductContext } from '../contexts/product-context';

const HomePageFilters = () => {
  const { filters } = useContext(ProductContext);
  return (
    <AppBar
      position="sticky"
      sx={{
        flexBasis: 240,
        flexShrink: 0,
        p: 0,
        backgroundColor: '#fff',
        top: '85px',
        mt: '35px',
      }}
    >
      <Paper sx={{ flexBasis: 240, flexShrink: 0, p: 2 }} elevation={3}>
        {filters.map(({ id, ...props }) => {
          return (
            <React.Fragment key={id}>
              <RangeFilter {...props} />
            </React.Fragment>
          );
        })}
      </Paper>
    </AppBar>
  );
};

export default HomePageFilters;
