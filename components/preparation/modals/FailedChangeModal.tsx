import { ModalType } from '@components/common/layouts/gnb/types';
import WAlert from '@components/common/modals/WAlert';
import { Box, Stack, Typography } from '@mui/material';

const FailedChangeModal = (props: ModalType) => {
  const { open, handleClose } = props;

  return (
    <WAlert
      open={open}
      handleClose={handleClose}
      title="조제 완료 상태 변경 실패"
      maxWidth="sm"
      btnTitle="닫기"
      titleSx={{ padding: '50px 0px 60px' }}
      activeOn
    >
      <Stack alignItems="center" paddingBottom="164px">
        <Typography variant="h5" color="#666" fontWeight="400">
          {`조제 완료 상태 변경이 실패하였습니다. `}
        </Typography>
        <Typography variant="h5" color="#666" fontWeight="400">
          {`잠시 후, 다시 시도해 주세요. `}
        </Typography>
      </Stack>
    </WAlert>
  );
};

export default FailedChangeModal;
