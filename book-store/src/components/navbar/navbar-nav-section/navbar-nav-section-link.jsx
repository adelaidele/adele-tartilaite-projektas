import React from 'react';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightBold,
  ':hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.primary.main,
  },
}));

const NavbarNavSectionLink = ({ to, children }) => (
  <StyledLink to={to}>{children}</StyledLink>
);

export default NavbarNavSectionLink;
