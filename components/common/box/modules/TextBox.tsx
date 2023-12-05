import { styled } from '@mui/material';
import WBox from '..';

export const BoxDisabledText = styled(WBox)(({ theme }) => ({
  ...theme.typography.body1,
  padding: '14px 12px',
  backgroundColor: '#f5f5f5',
  width: '100%',
  lineHeight: '1.3',
  letterSpacing: '0.5px',
}));
