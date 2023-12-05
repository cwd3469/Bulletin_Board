import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { mobileFormatOff } from '@utils/formatNumber';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiCommonMobileAuth, apiCommonAuthCheck } from '.';

interface UseMobileAuth {
  mobileNumber: string;
  authNumber: string;
  onAbledAuthInput: () => void;
  onAuthAction: () => void;
}

const useMobileAuthQuery = (props: UseMobileAuth) => {
  const { mobileNumber, authNumber, onAbledAuthInput, onAuthAction } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const [mobileNum, setMobile] = useState<string>('');
  const [code, setAuthCode] = useState<string>('');
  const { mutate: mutateCommonMobileAuth } = useMutation(apiCommonMobileAuth);
  const { mutate: mutateCommonAuthCheck } = useMutation(apiCommonAuthCheck);

  // 휴대폰 인증 번호 발급 요청
  const onClickMobileAuthRequest = useCallback(() => {
    const dto = { mobileNum: mobileFormatOff(mobileNum) };
    mutateCommonMobileAuth(dto, {
      onSuccess: (res, variables, context) => {
        if (res.data.code !== '0000') {
          toast?.on(msg.errMsg(res.data.code), 'info');
          return;
        } else {
          onAbledAuthInput();
        }
      },
      onError: (error, variable, context) => {
        toast?.on(
          '인증번호 발급에 실패 하였습니다. \n 잠시 후, 다시 시도해 주세요.',
          'error',
        );
      },
    });
  }, [mobileNum, msg, mutateCommonMobileAuth, onAbledAuthInput, toast]);

  const onClickAuthCheck = useCallback(() => {
    const dto = { mobileNum: mobileFormatOff(mobileNum), code };
    mutateCommonAuthCheck(dto, {
      onSuccess: (res) => {
        if (res.data.status === 'SUCCESS') {
          onAuthAction();
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
  }, [code, mobileNum, msg, mutateCommonAuthCheck, onAuthAction, toast]);

  useEffect(() => {
    setMobile(mobileNumber);
  }, [mobileNumber]);

  useEffect(() => {
    setAuthCode(authNumber);
  }, [authNumber]);

  return { onClickMobileAuthRequest, onClickAuthCheck };
};

export default useMobileAuthQuery;
