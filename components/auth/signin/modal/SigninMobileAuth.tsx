import useMobileAuth from '@components/auth/hooks/useMobileAuth';
import AuthMobileView from '@components/auth/views/AuthMobileView';
import { ModalType } from '@components/common/layouts/gnb/types';
import useMutationAuthentication from '@hooks/apis/auth/signin/useMutationAuthentication';
import { SigninInfoContext } from '@hooks/contexts/info/SigninInfoContext';
import { mobileFormat } from '@utils/formatNumber';
import React, { useContext } from 'react';
import { useCallback, useState } from 'react';
import { SigninState } from '../type';
import SigninProcess from './SigninProcess';

const SigninMobileAuth = (props: ModalType) => {
  const { info } = useContext(SigninInfoContext);
  const mobileAuthHook = useMobileAuth();
  const [modalLabel, setModalLabel] = useState<SigninState>('first');
  const [modalOn, setModalOn] = useState<boolean>(false);
  const mobileFormChange = info ? mobileFormat(info.accountMobileNum) : '';

  // 계정 상태 알림 모달 off 기능
  const resetModalClose = useCallback(() => {
    mobileAuthHook.onClickReset();
    props.handleClose();
    setModalOn(false);
  }, [mobileAuthHook, props]);

  // 계정 상태 알림 모달 on 기능
  const onOpenProcess = useCallback(
    (label: SigninState) => {
      setModalLabel(label);
      setModalOn(true);
      mobileAuthHook.onSetAuthDisabled();
    },
    [mobileAuthHook],
  );

  // useMutationAuthentication props data
  const customProp = {
    info: info,
    authenticationCode: mobileAuthHook.authValue,
    hanbleClose: props.handleClose,
    onOpenTextFiled: mobileAuthHook.onAbledAuthInput,
    onOpenProcess: onOpenProcess,
  };

  // useMutationAuthentication 휴대폰 인증 , 휴대폰 인증 번호 확인
  const { onClickMobileAuthRequest, onClickMobileAuthVerify } =
    useMutationAuthentication(customProp);

  return (
    <>
      <AuthMobileView
        mobileDisabled
        btnDisabled={mobileAuthHook.authRequestDisabled}
        open={props.open}
        authValue={mobileAuthHook.authValue}
        mobileValue={mobileFormChange}
        authDisabled={mobileAuthHook.authDisabled}
        bgDisable={false}
        numDisabled={mobileAuthHook.numDisabled}
        authError={mobileAuthHook.authError}
        mobileError={mobileAuthHook.mobileError}
        authOnChange={mobileAuthHook.onChangeAuthNum}
        mobileOnChange={mobileAuthHook.onChangeMobile}
        onTimerDisabled={mobileAuthHook.onTimerDisabled}
        focusOutEvent={mobileAuthHook.onFocusOutAuthNum}
        onClickAuthNumSend={onClickMobileAuthRequest}
        signupAuthOnClick={onClickMobileAuthVerify}
        resetModalClose={resetModalClose}
        timerActice={mobileAuthHook.onAuthTimeOut}
        timerResend={mobileAuthHook.onTimerDisabled}
      />
      {modalOn ? (
        <SigninProcess
          open={modalOn}
          handleClose={resetModalClose}
          label={modalLabel}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SigninMobileAuth;
