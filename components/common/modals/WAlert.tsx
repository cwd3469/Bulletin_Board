import { Stack } from '@mui/material';
import { ModalButton, WDialog, WDialogActions } from './styled';
import WModal from './WModal';
import { WAlertProps } from './types';

const WAlert = (props: WAlertProps) => {
  return (
    <WModal
      handleClose={props.handleClose}
      subTitle={props.subTitle}
      title={props.title}
      open={props.open}
      maxWidth={props.maxWidth}
      bgDisable={props.bgDisable}
      closeBtnOn={props.closeBtnOn}
      titleSx={props.titleSx}
      style={props.style}
      className={props.className}
      action={
        <WDialogActions>
          <ModalButton
            className={`actionBtn ${props.activeOn ? 'active' : ''} ${
              typeof props.disabled !== 'undefined' ? 'active' : ''
            }`}
            disabled={props.disabled ? props.disabled : false}
            variant="contained"
            color="info"
            onClick={props.handleEvent ? props.handleEvent : props.handleClose}
            sx={{
              width: '100%',
            }}
          >
            {props.btnTitle ? props.btnTitle : '닫기'}
          </ModalButton>
        </WDialogActions>
      }
    >
      {props.children}
    </WModal>
  );
};

WAlert.defaultProps = {
  open: false,
};

export default WAlert;
