import { Box, styled } from '@mui/material';

export const SigninLayout = styled(Box)(({ theme }) => ({
  width: '530px',
  backgroundColor: '#fff',
  padding: '60px 75px ',
  borderRadius: '12px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));
