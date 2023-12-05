import React from 'react';
import WConfirmModal from '@components/common/modals/WConfirm';
import { Box, Stack, Typography } from '@mui/material';
import { GnbMobalType } from '../types';
import { WLayout } from '../../WLayout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const GnbModal = (props: GnbMobalType) => {
  const { open, handleClose, timer, resend } = props;
  return (
    <WConfirmModal
      open={open}
      handleClose={handleClose}
      title="자동 로그아웃 안내"
      btnTitle="로그인 연장"
      handleEvent={resend}
      maxWidth="sm"
      activeOn
      titleSx={{ padding: '50px 0px 15px' }}
    >
      <Stack sx={{ padding: '0px 0px 118px', bgcolor: '#fff', gap: '48px' }}>
        <Stack>
          <Typography color="#4A4A4A" textAlign="center">
            장시간 활동이 없어 자동으로 로그아웃 됩니다.
          </Typography>
          <Typography color="#4A4A4A" textAlign="center">
            계속 이용하시려면 로그인 시간을 연장해 주세요.
          </Typography>
        </Stack>
        <Stack alignItems={'center'}>
          <Typography color="#4A4A4A" variant="body2">
            자동 로그아웃 안내
          </Typography>
          <Typography variant="h5" color="#333" fontSize="28px">
            <AccessTimeIcon sx={{ color: '#999999', fontSize: '20px' }} />{' '}
            {timer}
          </Typography>
        </Stack>
      </Stack>
    </WConfirmModal>
  );
};

GnbModal.defaultProps = {
  type: 'signin',
};

export default GnbModal;
