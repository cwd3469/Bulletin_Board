import { Button, Grid, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import FindAccountStepOne from './modal/FindAccountStepOne';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDebounceFn } from 'ahooks';

const FindAccount = () => {
  const [open, setOpen] = useState<boolean>(false);
  /** 계정 찾기 모달 on 이벤트 */
  const modalOpen = useCallback(() => setOpen(true), [setOpen]);
  const modalClose = useCallback(() => setOpen(false), [setOpen]);
  const onOpenModal = useDebounceFn(modalOpen, {
    wait: 300,
  });
  return (
    <Grid
      container
      justifyContent={'space-between'}
      gap="10px"
      alignItems={'center'}
    >
      <Typography
        display="block"
        fontWeight="normal"
        lineHeight={'1'}
        color="#555555"
        letterSpacing="-0.13px"
        fontSize="13px"
      >
        계정을 잊어버리셨나요?
      </Typography>
      <Button
        sx={{
          padding: '0px',
          color: '#000',
          fontWeight: 'normal',
          fontSize: '13px',
          letterSpacing: '-0.13px',
        }}
        onClick={onOpenModal.run}
      >
        계정 찾기{' '}
        <ArrowForwardIosIcon sx={{ fontSize: '11px', width: '18px' }} />
      </Button>
      {open ? (
        <FindAccountStepOne open={open} handleClose={modalClose} />
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default FindAccount;
