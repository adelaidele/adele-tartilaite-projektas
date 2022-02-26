import React from 'react';
import { Box, Slider, Input } from '@mui/material';
import FilterContainer from './filter-container';

const inputStyle = { p: 0.5, width: 45, textAlign: 'center' };

const RangeFilter = ({ name, min, max }) => {
  return (
    <FilterContainer name={name}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mb: 1,
        }}
      >
        <Input
          size="small"
          variant="standard"
          inputProps={{ sx: inputStyle }}
          value={min}
        />
        <Input
          size="small"
          variant="standard"
          inputProps={{ sx: inputStyle }}
          value={max}
        />
      </Box>
      <Box sx={{ px: 1 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={[min, max]}
          valueLabelDisplay="auto"
          min={min}
          max={max}
          sx={(theme) => ({
            '& .MuiSlider-thumb': {
              borderRadius: 0,
              backgroundColor: theme.palette.primary.light,
              height: 16,
              width: 16,
            },
            '& .MuiSlider-track': {
              backgroundColor: theme.palette.primary.light,
              borderColor: theme.palette.primary.light,
            },
          })}
        />
      </Box>
    </FilterContainer>
  );
};

export default RangeFilter;
