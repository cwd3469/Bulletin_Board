import { ModalButton, WDialogActions } from './styled';
import WModal from './WModal';
import { WConfirmProps } from './types';

export const WConfirm = (props: WConfirmProps) => {
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
      action={
        <WDialogActions>
          <ModalButton
            className="closeBtn"
            variant="contained"
            color="info"
            onClick={
              props.closeBtnEvent ? props.closeBtnEvent : props.handleClose
            }
          >
            {props.closeBtnTitle ? props.closeBtnTitle : '닫기'}
          </ModalButton>
          <ModalButton
            className={`actionBtn ${props.activeOn ? 'active' : ''} ${
              typeof props.disabled !== 'undefined' ? 'active' : ''
            }`}
            disabled={props.disabled ? props.disabled : false}
            variant="contained"
            onClick={props.handleEvent ? props.handleEvent : props.handleClose}
          >
            {props.btnTitle ? props.btnTitle : '확인'}
          </ModalButton>
        </WDialogActions>
      }
    >
      {props.children}
    </WModal>
  );
};

WConfirm.defaultProps = {
  open: false,
};

export default WConfirm;
