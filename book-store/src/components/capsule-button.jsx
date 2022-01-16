import { styled } from '@mui/material/styles';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';

const CapsuleButton = styled(ButtonUnstyled)(({ theme }) => ({
  background: theme.palette.common.white,
  border: 'none',
  padding: theme.spacing(1.5, 1.5),
  borderRadius: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));

export default CapsuleButton;
