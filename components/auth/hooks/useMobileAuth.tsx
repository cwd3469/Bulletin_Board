import { useCallback, useState, useEffect } from 'react';
import { useToastContext } from '@hooks/utils/useToastContext';
import useValidation from '@hooks/utils/useValidation';
import { ErrorType } from '@components/common/inputs/type';
import { mobileFormat, mobileFormatOff } from '@utils/formatNumber';

export default function useMobileAuth() {
  const toast = useToastContext();
  const validation = useValidation();
  const errMsg = useCallback(() => {
    const msg = {
      msg: '',
      boo: false,
    };
    return msg;
  }, [])();
  /// input value
  const [mobileValue, setMobile] = useState<string>('');
  const [authValue, setAuth] = useState<string>('');
  //유효성 alert
  const [authRequestDisabled, setAuthRequestDisabled] =
    useState<boolean>(false);
  //유효성 alert
  const [authDisabled, setAuthDisabled] = useState<boolean>(true);
  const [numDisabled, setNumDisabled] = useState<boolean>(true);
  const [mobileError, setMobileError] = useState<ErrorType>(errMsg);
  const [authError, setAuthError] = useState<ErrorType>(errMsg);

  const reset = useCallback(() => {
    setAuthDisabled(true);
    setNumDisabled(true);
    setAuthRequestDisabled(false);
    setMobileError(errMsg);
    setAuthError(errMsg);
    setMobile('');
    setAuth('');
  }, [errMsg]);

  /**휴대폰번호 입력 액션*/
  const onChangeMobile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passMsg = () => setMobileError({ msg: '', boo: false });
      const errMsg = () =>
        setMobileError({
          msg: '11자리의 휴대폰 번호를 입력해 주세요',
          boo: true,
        });

      const txt = e.target.value;
      if (txt.length <= 13) {
        if (txt.length > 3 && txt.substring(0, 3) !== '010') {
          errMsg();
          return;
        } else {
          if (validation.regExpMobileNumber.test(txt)) {
            const hyphen = mobileFormat(txt);
            const unHyphen = mobileFormatOff(txt);
            setMobile(hyphen);
            if (unHyphen.length == 11) {
              passMsg();
            } else {
              errMsg();
            }
            return;
          } else {
            errMsg();
          }
        }
      }
    },
    [setMobile, validation],
  );

  /**인증번호 입력불가 해제 액션*/
  const onAbledAuthInput = useCallback(() => {
    setAuthDisabled(false);
    setAuthRequestDisabled(true);
    setAuth('');
  }, []);

  /**인증번호 입력 액션*/
  const onChangeAuthNum = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 7) {
        validation.authNumder({
          txt: e.target.value,
          pass: setAuth,
          error: setAuthError,
        });
      }
    },
    [validation],
  );

  const onFocusOutAuthNum = () => {
    if (authValue.length < 6) {
      setAuthError({
        msg: '인증번호 6자리를 입력해 주세요.',
        boo: true,
      });
    } else {
      setAuthError({
        msg: '',
        boo: false,
      });
    }
  };

  // 인증 코드 입력 창 닫기
  const onSetAuthDisabled = useCallback(() => {
    setAuthDisabled(true);
  }, []);

  /**모든 모달 닫기 액션 */
  const onClickReset = useCallback(() => {
    reset();
  }, [reset]);

  /** 타이머 인증 번호 초기화 액션*/
  const onTimerDisabled = useCallback(() => {
    setAuthDisabled(true);
    setAuthRequestDisabled(false);
    setMobileError(errMsg);
    setAuthError(errMsg);
    setAuth('');
  }, [errMsg]);
  /** 타이머 인증 번호 유효시간 아웃 액션*/
  const onAuthTimeOut = useCallback(() => {
    toast?.on('인증번호 입력 유효 시간이 만료되었습니다', 'error');
    onTimerDisabled();
  }, [onTimerDisabled, toast]);

  useEffect(() => {
    if (mobileValue.length < 12) {
      setAuthDisabled(true);
      setNumDisabled(true);
      setAuth('');
    }
  }, [mobileValue, setAuth, setAuthDisabled, setNumDisabled]);

  useEffect(() => {
    if (authValue.length === 6) {
      setNumDisabled(false);
    } else {
      setNumDisabled(true);
    }
  }, [authValue, setNumDisabled]);

  return {
    authValue,
    mobileValue,
    authDisabled,
    numDisabled,
    authError,
    mobileError,
    onAuthTimeOut,
    onAbledAuthInput,
    onChangeAuthNum,
    onChangeMobile,
    onClickReset,
    onFocusOutAuthNum,
    onTimerDisabled,
    onSetAuthDisabled,
    setAuthRequestDisabled,
    authRequestDisabled,
  };
}
