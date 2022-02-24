import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const WideContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
    padding: theme.spacing(0, 10),
  },
}));

export default WideContainer;
