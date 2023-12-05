import React, { useCallback } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import processStatusCheck from 'public/assets/images/warningIcon.png';
import WAlert from '@components/common/modals/WAlert';
import { ModalType } from '@components/common/layouts/gnb/types';

interface ErrorModalType extends ModalType {
  event: () => void;
}

const ErrorModal = (props: ErrorModalType) => {
  const { open, handleClose, event } = props;
  const handleEvent = useCallback(() => {
    event();
    handleClose();
  }, [event, handleClose]);

  return (
    <WAlert
      maxWidth="sm"
      title="안내"
      btnTitle={'확인'}
      handleEvent={handleEvent}
      open={open}
      activeOn
      titleSx={{ padding: '50px 0' }}
    >
      <>
        <Grid container justifyContent="center">
          <Image
            src={processStatusCheck}
            alt="접수 시작 아이콘"
            width="52px"
            height="47px"
          />
        </Grid>
        <Box height="20px" />
        <Box textAlign="center">
          <Typography
            color="#666"
            textAlign="center"
            fontSize="24px"
            lineHeight={'1.2'}
          >
            일시적인 오류가 발생하여
          </Typography>
          <Typography
            color="#666"
            textAlign="center"
            fontSize="24px"
            lineHeight={'1.2'}
          >
            로그인 페이지로 이동합니다.
          </Typography>
        </Box>
        <Box height="150px" />
      </>
    </WAlert>
  );
};

export default ErrorModal;
