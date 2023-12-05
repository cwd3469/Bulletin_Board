import useMobileAuth from '@components/auth/hooks/useMobileAuth';
import useMobileAuthQuery from '@hooks/apis/auth/common/useMobileAuthQuery';
import AuthMobileView from '@components/auth/views/AuthMobileView';
import { ModalType } from '@components/common/layouts/gnb/types';
import { useCallback, useState } from 'react';
import SignupStepThree from './SignupStepThree';

const SignupStepTwo = (props: ModalType) => {
  const mobileAuthHook = useMobileAuth();
  const [bgDisable, setBgDisable] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);

  /**SignupStepTwo SignupStepThree 모달 on 기능*/
  const onAuthAction = useCallback(() => {
    setModalOn(true);
    setBgDisable(true);
    mobileAuthHook.onSetAuthDisabled();
  }, [mobileAuthHook]);

  /**SignupStepTwo props data*/
  const mobileAuthQueryProp = {
    mobileNumber: mobileAuthHook.mobileValue,
    authNumber: mobileAuthHook.authValue,
    onAbledAuthInput: mobileAuthHook.onAbledAuthInput,
    onAuthAction: onAuthAction,
  };

  /**SignupStepTwo 공통 휴대폰 인증 발송 , 확인 기능*/
  const { onClickMobileAuthRequest, onClickAuthCheck } =
    useMobileAuthQuery(mobileAuthQueryProp);

  /**SignupStepTwo 공통 휴대폰 인증 발송 , 확인 기능*/
  const resetModalClose = useCallback(() => {
    mobileAuthHook.onClickReset();
    props.handleClose();
    setBgDisable(false);
    setModalOn(false);
  }, [mobileAuthHook, props]);

  return (
    <>
      <AuthMobileView
        open={props.open}
        authValue={mobileAuthHook.authValue}
        mobileValue={mobileAuthHook.mobileValue}
        authDisabled={mobileAuthHook.authDisabled}
        bgDisable={bgDisable}
        numDisabled={mobileAuthHook.numDisabled}
        mobileDisabled={mobileAuthHook.authRequestDisabled}
        btnDisabled={mobileAuthHook.authRequestDisabled}
        authError={mobileAuthHook.authError}
        mobileError={mobileAuthHook.mobileError}
        authOnChange={mobileAuthHook.onChangeAuthNum}
        mobileOnChange={mobileAuthHook.onChangeMobile}
        onTimerDisabled={mobileAuthHook.onTimerDisabled}
        focusOutEvent={mobileAuthHook.onFocusOutAuthNum}
        onClickAuthNumSend={onClickMobileAuthRequest}
        signupAuthOnClick={onClickAuthCheck}
        resetModalClose={resetModalClose}
        timerActice={mobileAuthHook.onAuthTimeOut}
        timerResend={mobileAuthHook.onTimerDisabled}
      />
      {modalOn ? (
        <SignupStepThree
          mobileValue={mobileAuthHook.mobileValue}
          open={modalOn}
          handleClose={resetModalClose}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SignupStepTwo;
