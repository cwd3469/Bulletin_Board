import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const WNotionBoardHead = styled(Box)(({ theme }) => ({
  padding: '30px 38px',
  borderBottom: '1px solid #ebeced',
  height: '108px',
  '& .title': {
    fontWeight: '400',
    lineHeight: '1',
  },
  '& .info': {
    lineHeight: '1',
  },
  '& .info.name': {
    color: '#333',
  },
  '& .info.substance': {
    color: '#555',
  },
}));
export const WNotionBoardBody = styled(Box)(({ theme }) => ({
  overflowX: 'hidden',
  height: '572px',
}));
