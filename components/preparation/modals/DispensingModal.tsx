import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import { Stack, Typography } from '@mui/material';
import processStatus from 'public/assets/icon/processStatus.svg';
import Image from 'next/image';
import useMutateDispensingExpenses from '@hooks/apis/preparation/proceed/hooks/useMutateDispensingExpenses';
import { useDebounceFn, useKeyPress } from 'ahooks';
import DeliveryRequestModal, { DeliveryState } from './DeliveryRequestModal';
import { useCallback, useState } from 'react';

interface DispensingModalType extends ModalType {
  id: string;
  mode: DeliveryState;
}

const DispensingModal = (props: DispensingModalType) => {
  const { open, handleClose, id, mode } = props;
  /**DispensingModal 당일배송 요청 모달 상태*/
  const [deliveryOpen, setDeliveryOpen] = useState<boolean>(false);

  return (
    <WConfirm
      activeOn
      open={open}
      title={'배송 요청 전 복약지도 안내'}
      maxWidth="sm"
      titleSx={{ padding: '50px 0 60px' }}
      btnTitle={'배송 요청'}
      handleClose={handleClose}
      handleEvent={() => setDeliveryOpen(true)}
      bgDisable={deliveryOpen}
    >
      <Stack gap="16px" padding="0px 0 85px" width="420px">
        <Image src={processStatus} alt="상태" />
        <>
          <Stack alignItems="center">
            <Typography variant="h5" color="#666" fontWeight="400">
              {'환자에게 유선 및 서면을 통한'}
            </Typography>
            <Typography variant="h5" color="#666" fontWeight="400">
              {'복약지도 꼭! 부탁드립니다.'}
            </Typography>
          </Stack>
        </>
        <DeliveryRequestModal
          id={id}
          mode={mode}
          open={deliveryOpen}
          handleClose={() => {
            handleClose();
            setDeliveryOpen(false);
          }}
        />
      </Stack>
    </WConfirm>
  );
};

export default DispensingModal;
