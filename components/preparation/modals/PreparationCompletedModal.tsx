import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import useMutateDispensingExpenses from '@hooks/apis/preparation/proceed/hooks/useMutateDispensingExpenses';
import { Box, Stack, Typography } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import FailedChangeModal from './FailedChangeModal';
import { useState } from 'react';

interface PreparationCompletedModalType extends ModalType {
  medicineOrderUlid?: string;
}

const PreparationCompletedModal = (props: PreparationCompletedModalType) => {
  const { open, handleClose, medicineOrderUlid } = props;
  const [failedOpen, setFailedOpen] = useState<boolean>(false);
  /**PreparationCompletedModal 조제 완료 api 통신 */
  const { onClickPreparationComplete } = useMutateDispensingExpenses({
    medicineOrderUlid: medicineOrderUlid ? medicineOrderUlid : '',
    completeCoast: {
      onSuccess: handleClose,
      onError: () => setFailedOpen(true),
    },
  });
  /**PreparationCompletedModal 조제 완료 api 통신 useDebounceFn*/
  const onClickCompleteDebounce = useDebounceFn(onClickPreparationComplete, {
    wait: 300,
  });

  return (
    <WConfirm
      open={open}
      handleClose={handleClose}
      title="조제 완료 상태 변경"
      maxWidth="sm"
      btnTitle="조제 완료"
      titleSx={{ padding: '50px 0px 60px' }}
      handleEvent={onClickCompleteDebounce.run}
      bgDisable={failedOpen}
      activeOn
    >
      <Stack alignItems="center" paddingBottom="68px" gap="20px">
        <Typography
          variant="h5"
          color="#666"
          fontWeight="500"
          textAlign="center"
          sx={{ wordBreak: 'keep-all' }}
        >
          {`조제비를 확인해 주세요. `}
        </Typography>
        <Typography
          color="#666"
          textAlign="center"
          sx={{ wordBreak: 'keep-all', fontSize: '22px' }}
          width="230px"
        >
          {`조제 완료상태가 되면 조제비 수정이 불가합니다.`}
        </Typography>
        <Box height="25px" />
        <FailedChangeModal
          open={failedOpen}
          handleClose={() => setFailedOpen(false)}
        />
      </Stack>
    </WConfirm>
  );
};

export default PreparationCompletedModal;
