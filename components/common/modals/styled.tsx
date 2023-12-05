import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from '@mui/material';
import Image from 'next/image';
import closeModal from 'public/assets/icon/closeModal.svg';

export const WToastAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid #999',
  borderWidth: '1px',
  borderRadius: '0px',
  ...theme.typography.body1,
  color: '#000',
  padding: '25px',
  '&.MuiPaper-root': {
    alignItems: 'center',
  },
  '& .MuiAlert-message': {
    padding: '0px',
    marginLeft: '30px',
  },
  '& .MuiAlert-icon': {
    padding: '0px',
    margin: '0px',
  },
}));

export const WCircularProgress = styled(CircularProgress)(({ theme }) => ({
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#0acf83',
    transition: 'transform 10s ease-in-out',
  },
}));

export const ModalButton = styled(Button)(({ theme }) => ({
  width: '50%',
  marginLeft: '0px !important',
  borderRadius: '0px',
  padding: '25px',
  ...theme.typography.h5,
  fontWeight: '400',
  lineHeight: '1.2',
  '&.closeBtn': {
    backgroundColor: '#999',
    color: '#fff',
  },
  '&.actionBtn': {
    border: '0px',
    boxShadow: 'none',
    backgroundColor: '#c1c1c1',
    color: '#fff',
    '&.active': {
      backgroundColor: '#4ac6ff',
    },
  },
  '&.Mui-disabled': {
    backgroundColor: '#d8d8d8 !important',
    color: '#999',
  },
}));

export const WDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '8px',
  },

  '& .MuiBackdrop-root': {
    transition: 'all 0.5s !important',
  },
}));

export const WDialogActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: 'space-between',
  padding: '0px',
  gap: '0px',
}));

export const WDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '0px 40px',
  position: 'relative',
}));

export const WDialogTitle = styled(DialogTitle)(({ theme }) => ({
  ...theme.typography.h5,
  textAlign: 'center',
  letterSpacing: '0px',
  padding: '0px',
}));

export const WDialogContentText = styled(DialogContentText)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: '400',
  letterSpacing: '0px',
  textAlign: 'center',
}));

export const WDialogLayout = styled(Box)(({ theme }) => ({}));

export const WModalClose = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <Button
      className="wModalClose"
      color="info"
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '40px ',
        right: '40px',
        zIndex: '99',
        padding: '0px',
        minWidth: '0px',
      }}
    >
      <Image src={closeModal} alt="닫기 버튼"></Image>
    </Button>
  );
};
