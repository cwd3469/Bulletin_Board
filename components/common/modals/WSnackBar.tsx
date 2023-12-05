import Snackbar from '@mui/material/Snackbar';
import { AlertColor } from '@mui/material/Alert';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { WSnackBarType } from './types';
import { ErrorIcon, InfoIcon } from '../dataDisplay/WIcons';
import { WToastAlert } from './styled';

export const IconList = (type: AlertColor) => {
  switch (type) {
    case 'success':
      return <CheckIcon fontSize="small" />;
    case 'info':
      return <InfoIcon />;
    case 'warning':
      return <ErrorOutlineOutlinedIcon fontSize="small" />;
    case 'error':
      return <ErrorIcon />;
    default:
      return <CheckIcon fontSize="small" />;
  }
};

const WSnackBar = (props: WSnackBarType) => {
  const { type, msg, open, close } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={close}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <WToastAlert
        icon={IconList(type)}
        variant="outlined"
        severity={type ? type : 'success'}
        sx={{
          width: '100%',
          borderRadius: '6px',
          padding: '10px 20px',
          height: '70px',
        }}
      >
        <Box sx={{ minWidth: '260px', overflowY: 'hidden' }}>
          {msg.split('\n').map((item, index) => {
            return (
              <Typography lineHeight={'1.2'} key={index} fontSize="14px">
                {item}
              </Typography>
            );
          })}
        </Box>
      </WToastAlert>
    </Snackbar>
  );
};

export default WSnackBar;
