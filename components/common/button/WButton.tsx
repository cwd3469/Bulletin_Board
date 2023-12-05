import { Button, ButtonProps, styled } from '@mui/material';

export const WButton = styled((props: ButtonProps) => {
  return <Button {...props}>{props.children}</Button>;
})(({ theme }) => ({
  width: '180px',
  height: '60px',
  boxShadow: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  letterSpacing: '0px',
  '&:hover': {
    boxShadow: '0px 0px 0px',
  },
}));
