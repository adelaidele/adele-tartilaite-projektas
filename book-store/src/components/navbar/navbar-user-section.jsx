import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CapsuleButton from '../capsule-button';

const UserSectionContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const UserCapsule = styled(CapsuleButton)(({ theme }) => ({
  border: 1,
  borderColor: theme.palette.grey[200],
  height: 42,
  display: 'flex',
  gap: theme.spacing(1),
  paddingRight: theme.spacing(0.5),
}));

const NavbarUserSection = () => (
  <UserSectionContainer>
    <UserCapsule>
      <MenuIcon sx={{ fontSize: 18 }} />
      <AccountCircleIcon sx={{ fontSize: 34 }} />
    </UserCapsule>
  </UserSectionContainer>
);

export default NavbarUserSection;
