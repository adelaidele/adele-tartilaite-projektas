import React, { useState, useEffect } from 'react';
import {
  Box,
  Slider,
  Input,
} from '@mui/material';
import FilterContainer from './filter-container';

const inputStyle = { p: 0.5, width: 45, textAlign: 'center' };

const RangeFilter = ({
  name,
  min,
  max,
  currMin,
  currMax,
  changeFilter,
}) => {
  const [currRange, setCurrRange] = useState([currMin, currMax]);
  const [minInputValue, setMinInputValue] = useState(currMin);
  const [maxInputValue, setMaxInputValue] = useState(currMax);

  const handleMinInputValueChange = (e) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) {
      setMinInputValue(value);
    }
  };

  const handleMinInputBlur = () => {
    if (minInputValue >= min && minInputValue <= currMax) {
      changeFilter([minInputValue, currMax]);
    } else {
      setMinInputValue(currMin);
    }
  };

  const handleMaxInputValueChange = (e) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) {
      setMaxInputValue(value);
    }
  };

  const handleMaxInputBlur = () => {
    if (maxInputValue >= currMin && maxInputValue <= max) {
      changeFilter([currMin, maxInputValue]);
    } else {
      setMaxInputValue(currMax);
    }
  };

  useEffect(() => {
    setCurrRange([currMin, currMax]);
    setMinInputValue(currMin);
    setMaxInputValue(currMax);
  }, [currMin, currMax]);

  return (
    <FilterContainer name={name}>
      <Box sx={{
        display: 'flex', justifyContent: 'center', gap: 2, mb: 1,
      }}
      >
        <Input
          size="small"
          variant="standard"
          inputProps={{ sx: inputStyle }}
          value={minInputValue}
          onChange={handleMinInputValueChange}
          onBlur={handleMinInputBlur}
        />
        <Input
          size="small"
          variant="standard"
          inputProps={{ sx: inputStyle }}
          value={maxInputValue}
          onChange={handleMaxInputValueChange}
          onBlur={handleMaxInputBlur}
        />
      </Box>
      <Box sx={{ px: 1 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={currRange}
          valueLabelDisplay="auto"
          min={min}
          max={max}
          onChange={(_, range) => setCurrRange(range)}
          onChangeCommitted={(_, range) => changeFilter(range)}
          sx={(theme) => ({
            '& .MuiSlider-thumb': {
              borderRadius: 0,
              backgroundColor: theme.palette.secondary.main,
              height: 16,
              width: 16,
              '&:hover': {
                boxShadow: '0px 0px 0px 4px rgb(37 37 37 / 16%)',
              },
              '&.Mui-focusVisible': {
                boxShadow: '0px 0px 0px 6px rgb(37 37 37 / 16%)',
              },
            },
          })}
        />
      </Box>
    </FilterContainer>
  );
};

export default RangeFilter;