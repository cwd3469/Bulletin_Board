import { SigninDto, SigninState } from '@components/auth/signin/type';
import { SigninInfoContext } from '@hooks/contexts/info/SigninInfoContext';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { setCookie } from 'cookies-next';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { apiSignin } from './index';

interface UseMutationSignin {
  info: SigninDto;
  onOpenModal: (label: SigninState) => void;
}

const useMutationSignin = (props: UseMutationSignin) => {
  const { info, onOpenModal } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { setInInfo } = useContext(SigninInfoContext);
  const { mutate: mutateSignin } = useMutation(apiSignin);
  const [siginInfo, setSignInfo] = useState<SigninDto>();

  const onClickSignin = useCallback(() => {
    if (siginInfo) {
      mutateSignin(siginInfo, {
        onSuccess: (res) => {
          const code = res.data.code;
          const data = res.data.data;
          if (code !== '0000') {
            toast?.on(`로그인 정보를 확인해 주세요.`, 'error');
          } else {
            onOpenModal('success');
            setCookie('accountId', siginInfo.accountId);
            setInInfo(data);
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(`로그인 정보를 확인해 주세요.`, 'error');
        },
      });
    }
  }, [mutateSignin, onOpenModal, setInInfo, siginInfo, toast]);
  /**회원가입 신청 이벤트 */

  useEffect(() => {
    if (info) {
      setSignInfo(info);
    }
  }, [info]);

  return { onClickSignin };
};

export default useMutationSignin;
