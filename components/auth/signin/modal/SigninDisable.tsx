import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ModalType } from '@components/common/layouts/gnb/types';
import WAlert from '@components/common/modals/WAlert';

const SigninDisable = (props: ModalType) => {
  const { open, handleClose } = props;
  return (
    <WAlert
      open={open}
      handleClose={handleClose}
      maxWidth="xl"
      title="비활성 계정 안내"
    >
      <Stack width="720px">
        <Stack padding="0px 40px">
          <Stack
            padding="34px 40px"
            justifyContent={'flex-start'}
            sx={{
              backgroundColor: '#F8F8F8',
            }}
          >
            <Typography color="#333" variant="body2">
              정지 사유 안내
            </Typography>
            <Box height="10px" />
            <Typography color="#4A4A4A" variant="h5">
              정지 사유로 계정이 정지 되었습니다
            </Typography>
            <Box height="30px" />
            <Box borderTop={'1px solid #EBECED'} />
            <Box height="16px" />
            <Stack gap="5px">
              <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2">
                정지 사유로 인하여 계정이 정지되었습니다.
              </Typography>
              <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2">
                계정 관련 문의는 아래 고객센터로 문의 바랍니다.
              </Typography>
              <Box height="20px" />
              <Grid container gap="10px" alignItems={'center'}>
                <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2">
                  게시판 고객센터
                </Typography>
                <Box height="14px" width="1px" bgcolor={'#CCC'} />
                <Typography color="#000" lineHeight="1.2">
                  02-123-123
                </Typography>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
        <Box height="80px" />
      </Stack>
    </WAlert>
  );
};
SigninDisable.defaultProps = {
  type: 'signin',
};

export default SigninDisable;
