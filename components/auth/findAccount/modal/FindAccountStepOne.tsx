import useMobileAuth from '@components/auth/hooks/useMobileAuth';
import AuthMobileView from '@components/auth/views/AuthMobileView';
import { ModalType } from '@components/common/layouts/gnb/types';
import useMobileAuthFindAccount from '@hooks/apis/auth/findAccount/useMobileAuthFindAccount';
import { useCallback, useState } from 'react';
import FindAccountStepTwo from './FindAccountStepTwo';

const FindAccountStepOne = (props: ModalType) => {
  const mobileAuthHook = useMobileAuth();
  const [bgDisable, setBgDisable] = useState<boolean>(false);
  const [modalOn, setModalOn] = useState<boolean>(false);

  /**FindAccountStepOne SignupStepThree 모달 on 기능*/
  const onAuthAction = useCallback(() => {
    setModalOn(true);
    setBgDisable(true);
    mobileAuthHook.onSetAuthDisabled();
  }, [mobileAuthHook]);

  /**FindAccountStepOne SignupStepThree 모달 on 기능*/
  const resetModalClose = () => {
    mobileAuthHook.onClickReset();
    props.handleClose();
    setBgDisable(false);
    setModalOn(false);
  };
  /**FindAccountStepOne props data*/
  const mobileAuthQueryProp = {
    mobileNumber: mobileAuthHook.mobileValue,
    authNumber: mobileAuthHook.authValue,
    onAbledAuthInput: mobileAuthHook.onAbledAuthInput,
    onAuthAction: onAuthAction,
  };

  /**FindAccountStepOne 계정 찾기 휴대폰 인증 발송 , 확인 기능*/
  const { onClickMobileAuthRequest, onClickAuthCheck, accountInfo } =
    useMobileAuthFindAccount(mobileAuthQueryProp);

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
        <FindAccountStepTwo
          open={modalOn}
          handleClose={resetModalClose}
          info={accountInfo}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default FindAccountStepOne;
