import { styled, TextareaAutosize } from '@mui/material';

export const WTaxtarea = styled(TextareaAutosize)(({ theme }) => ({
  resize: 'none',
  border: '0px',
  fontSize: '14px',
  lineHeight: '1.4',
  width: '100%',
  outlineColor: '#fff',
  overflowY: 'scroll',
  '&:disabled': {
    backgroundColor: '#F8F8F8',
    color: '#CCC',
  },
}));
