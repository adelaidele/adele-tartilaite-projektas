import React from 'react';
import { Box } from '@mui/material';
import NavbarNavSectionLink from './navbar-nav-section-link';

const NavbarNavSection = () => (
  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
    <NavbarNavSectionLink to="/">
    </NavbarNavSectionLink>
    <NavbarNavSectionLink to="/book-grid">Book grid</NavbarNavSectionLink>
    <NavbarNavSectionLink to="/">home page</NavbarNavSectionLink>
    <NavbarNavSectionLink to="/management">Management</NavbarNavSectionLink>
    <NavbarNavSectionLink to="/login">Log in</NavbarNavSectionLink>

  </Box>
);

export default NavbarNavSection;
