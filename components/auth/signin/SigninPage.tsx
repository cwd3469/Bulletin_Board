import React, { useRef } from 'react';
import { Stack, Grid, Box } from '@mui/material';
import { Logo } from '@components/common/layouts/WLayout';
import {
  WPwTextField,
  WUseridTextField,
} from '@components/common/inputs/textField/modules';
import { WButton } from '@components/common/button/WButton';
import useSignin from '../hooks/useSignin';
import useMutationSignin from '@hooks/apis/auth/signin/useMutationSignin';
import SigninMobileAuth from './modal/SigninMobileAuth';
import { useDebounceFn, useKeyPress } from 'ahooks';
import WSubTitle from '@components/common/typography/WSubTitle';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  wTitle: {
    '& .wSubTitle-title': {
      fontWeight: '500',
      color: '#333',
      lineHeight: '24px',
    },
  },
}));

const SigninPage = () => {
  const classes = useStyles();
  const {
    modalOn,
    disabled,
    modalLabel,
    siginInfo,
    siginErr,
    onOpenModal,
    handleClose,
    setState,
    setStateErr,
  } = useSignin();
  const signinRef = useRef(null);

  const { onClickSignin } = useMutationSignin({
    info: siginInfo,
    onOpenModal,
  });
  const onClickSigninHook = useDebounceFn(onClickSignin, {
    wait: 300,
  });

  useKeyPress(
    'enter',
    () => {
      if (!disabled) {
        onClickSigninHook.run();
      }
    },
    {
      target: signinRef,
    },
  );

  return (
    <Stack>
      <Grid container justifyContent={'center'} sx={{ paddingBottom: '108px' }}>
        <Logo
          sx={{
            width: '215px',
            height: '90px',
          }}
        />
      </Grid>
      <Stack ref={signinRef}>
        <Stack gap="16px">
          <WSubTitle className={classes.wTitle} title="아이디" />
          <WUseridTextField
            state={siginInfo.accountId}
            setState={setState}
            keyId="accountId"
            err={siginErr.accountId}
            setErr={setStateErr}
          />
        </Stack>
        <Stack gap="16px">
          <WSubTitle className={classes.wTitle} title="비밀번호" />
          <WPwTextField
            state={siginInfo.password}
            setState={setState}
            keyId="password"
            err={siginErr.password}
            setErr={setStateErr}
          />
        </Stack>
        <Box height="24px" />
        <Stack gap="5px">
          <WButton
            onClick={onClickSigninHook.run}
            disabled={disabled}
            variant="contained"
            sx={{
              width: '100%',
            }}
          >
            로그인
          </WButton>
        </Stack>
        <Box sx={{ paddingTop: '50px' }} />
      </Stack>
      <SigninMobileAuth open={modalOn} handleClose={handleClose} />
    </Stack>
  );
};
export default SigninPage;
