import React, { useCallback } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import processStatusCheck from 'public/assets/icon/processStatusCheck.svg';
import processStatusClose from 'public/assets/icon/processStatusClose.svg';
import { ModalType } from '../types';
import WConfirm from '@components/common/modals/WConfirm';
import { useDebounceFn } from 'ahooks';

interface GnbTreatStateViewType extends ModalType {
  status: boolean;
  onClickExtensionOpen: () => void;
  onClickExtensionClose: () => void;
}

const GnbTreatStateView = (props: GnbTreatStateViewType) => {
  const onClickExtensionCloseDebounce = useDebounceFn(
    props.onClickExtensionClose,
    {
      wait: 300,
    },
  );
  const onClickExtensionOpenDebounce = useDebounceFn(
    props.onClickExtensionOpen,
    {
      wait: 300,
    },
  );

  const handleEvent = useCallback(() => {
    if (props.status) {
      onClickExtensionCloseDebounce.run();
      return;
    } else {
      onClickExtensionOpenDebounce.run();
      return;
    }
  }, [
    onClickExtensionCloseDebounce,
    onClickExtensionOpenDebounce,
    props.status,
  ]);
  return (
    <WConfirm
      open={props.open}
      handleClose={props.handleClose}
      title={props.status ? '조제 접수 마감' : '조제 접수 시작'}
      btnTitle={props.status ? '접수 마감' : '접수 시작'}
      handleEvent={handleEvent}
      maxWidth="sm"
      activeOn
    >
      <Stack width="420px" paddingTop="10px" gap="24px">
        {props.status ? (
          <>
            <Image src={processStatusClose} alt="접수 마감 아이콘" />
            <Typography color="#666" textAlign="center" fontSize="22px">
              조제 접수를 <span style={{ fontWeight: 'bold' }}>마감</span>
              하시겠습니까?
            </Typography>
            <Box height="50px" />
          </>
        ) : (
          <>
            <Image src={processStatusCheck} alt="접수 시작 아이콘" />
            <Typography color="#666" textAlign="center" fontSize="22px">
              조제 접수를 <span style={{ fontWeight: 'bold' }}>시작</span>
              하시겠습니까?
            </Typography>
            <Box height="100px" />
          </>
        )}
      </Stack>
    </WConfirm>
  );
};

export default GnbTreatStateView;
