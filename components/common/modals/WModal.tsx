import { Breakpoint, Stack } from '@mui/material';
import { WModalProps } from './types';
import {
  WDialog,
  WDialogContent,
  WDialogContentText,
  WDialogLayout,
  WDialogTitle,
  WModalClose,
} from './styled';
import React from 'react';

const WModal = (props: WModalProps) => {
  const contentsWidth = (Breakpoint: Breakpoint | undefined) => {
    switch (Breakpoint) {
      case 'xs':
        return '444px';
      case 'sm':
        return '500px';
      case 'md':
        return '720px';
      case 'xl':
        return '800px';
      case 'lg':
        return '1200px';
      default:
        return 'auto';
    }
  };

  return (
    <WDialog
      className={props.className}
      open={props.open}
      onClose={props.handleClose}
      maxWidth={props.maxWidth}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: props.bgDisable
            ? 'rgba(0, 0, 0, 0)'
            : 'rgba(0, 0, 0, 0.5)',
        },
        ...props.style,
      }}
    >
      {' '}
      {props.title ? (
        <Stack
          className="title-stack"
          gap="16px"
          padding="64px 40px 56px"
          sx={props.titleSx}
          width={contentsWidth(props.maxWidth)}
        >
          {props.title ? <WDialogTitle>{props.title}</WDialogTitle> : ''}
          {props.subTitle ? (
            <WDialogContentText>{props.subTitle}</WDialogContentText>
          ) : (
            ''
          )}
        </Stack>
      ) : (
        ''
      )}
      <WDialogContent sx={{ width: contentsWidth(props.maxWidth) }}>
        <WDialogLayout>{props.children}</WDialogLayout>
      </WDialogContent>
      {props.action}
      {props.closeBtnOn ? <WModalClose onClick={props.handleClose} /> : ''}
    </WDialog>
  );
};

WModal.defaultProps = {
  open: false,
};

export default WModal;
