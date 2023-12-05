import React, { useCallback, useState } from 'react';
import { Stack, Box } from '@mui/material';
import useChangePw from '@components/auth/hooks/useChangePw';
import { ModalType } from '@components/common/layouts/gnb/types';
import { useToastContext } from '@hooks/utils/useToastContext';
import WAlert from '@components/common/modals/WAlert';
import {
  WPwTextField,
  WRepwTextField,
} from '@components/common/inputs/textField/modules';

const SigninFirstChangePw = (props: ModalType) => {
  const { state, errs, disable, setInInfo, setInInfoErr } = useChangePw();
  const toast = useToastContext();

  const pwChangeEvent = useCallback(() => {
    const dto = {
      pw: state.pw,
      repw: state.repw,
    };
    let status = 200;
    if (status === 200) {
      props.handleClose();
      // console.log(dto);
    } else {
      toast?.on('입력하신 비밀번호와 일치하지 않습니다.', 'error');
    }
  }, [props, state.pw, state.repw, toast]);

  return (
    <WAlert
      open={props.open}
      handleClose={props.handleClose}
      handleEvent={pwChangeEvent}
      btnTitle={'비밀번호 변경'}
      disabled={disable}
      maxWidth={'xl'}
      title="임시 비밀번호 재설정"
      subTitle="임시 비밀번호로 로그인하였습니다. 비밀번호 변경 후 이용해 주세요."
      activeOn
      closeBtnOn
    >
      <Stack justifyContent="center" width={'720px'} alignItems="center">
        <Stack width="320px" gap="8px">
          <WPwTextField
            state={state.pw}
            err={errs.pwErr}
            setState={setInInfo}
            setErr={setInInfoErr}
            keyId={'pw'}
          />
          <WRepwTextField
            pw={state.pw}
            state={state.repw}
            err={errs.repwErr}
            setState={setInInfo}
            setErr={setInInfoErr}
            keyId={'repw'}
          />
        </Stack>
        <Box paddingTop={'90px'} />
      </Stack>
    </WAlert>
  );
};

export default SigninFirstChangePw;
