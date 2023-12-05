import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { mobileFormatOff } from '@utils/formatNumber';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { apiFindAccountMobileAuth, apiFindAccountAuthCheck } from '.';

interface UseMobileAuth {
  mobileNumber?: string;
  authNumber?: string;
  onAbledAuthInput?: () => void;
  onAuthAction?: () => void;
}

const useMobileAuthFindAccount = (props: UseMobileAuth) => {
  const { mobileNumber, authNumber, onAbledAuthInput, onAuthAction } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const [accountInfo, setAccountInfo] =
    useState<{
      accountUlid: string;
      maskedAccountId: string;
      verificationCode: string;
    }>();

  const [mobileNum, setMobile] = useState<string>('');
  const [code, setAuthCode] = useState<string>('');
  const { mutate: mutateFindAccountMobileAuth } = useMutation(
    apiFindAccountMobileAuth,
  );
  const { mutate: mutateFindAccountAuthCheck } = useMutation(
    apiFindAccountAuthCheck,
  );

  // 휴대폰 인증 번호 발급 요청
  const onClickMobileAuthRequest = useCallback(() => {
    if (mobileNum) {
      const dto = { mobileNum: mobileFormatOff(mobileNum) };
      mutateFindAccountMobileAuth(dto, {
        onSuccess: (res, variables, context) => {
          if (res.data.code !== '0000') {
            toast?.on(msg.errMsg(res.data.code), 'info');
            return;
          } else {
            if (onAbledAuthInput) {
              onAbledAuthInput();
            }
          }
        },
        onError: (error, variable, context) => {
          toast?.on(
            '인증번호 발급에 실패 하였습니다. \n 잠시 후, 다시 시도해 주세요.',
            'error',
          );
        },
      });
    }
  }, [mobileNum, msg, mutateFindAccountMobileAuth, onAbledAuthInput, toast]);

  const onClickAuthCheck = useCallback(() => {
    if (code) {
      const dto = { mobileNum: mobileFormatOff(mobileNum), code };
      mutateFindAccountAuthCheck(dto, {
        onSuccess: (res) => {
          if (res.data.status === 'SUCCESS') {
            if (onAuthAction) {
              onAuthAction();
              const ins = {
                accountUlid: res.data.data.accountUlid,
                maskedAccountId: res.data.data.maskedAccountId,
                verificationCode: res.data.data.verificationCode,
              };
              setAccountInfo(ins);
            }
          }
          if (res.data.status === 'FAIL') {
            toast?.on(msg.errMsg(res.data.code), 'warning');
            return;
          }
        },
        onError: (err) => {
          toast?.on(
            '인증번호가 일치하지 않습니다 \n 잠시 후, 다시 시도해 주세요.',
            'error',
          );
        },
      });
    }
  }, [code, mobileNum, msg, mutateFindAccountAuthCheck, onAuthAction, toast]);

  useEffect(() => {
    if (mobileNumber) {
      setMobile(mobileNumber);
    }
  }, [mobileNumber]);

  useEffect(() => {
    if (authNumber) {
      setAuthCode(authNumber);
    }
  }, [authNumber]);

  return { onClickMobileAuthRequest, onClickAuthCheck, accountInfo };
};

export default useMobileAuthFindAccount;
