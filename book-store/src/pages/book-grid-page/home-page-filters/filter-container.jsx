import React from 'react';
import { Box, Typography } from '@mui/material';

const FilterContainer = ({ name, children, ...props }) => (
  <Box {...props}>
    <Typography sx={{ textTransform: 'capitalize' }} variant="h6">
      {name}
    </Typography>
    {children}
  </Box>
);

export default FilterContainer;
