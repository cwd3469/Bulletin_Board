import { useState, useCallback, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { ErrorType } from '@components/common/inputs/type';
import { SigninDto, SigninErr, SigninState } from '../signin/type';

const useSignin = () => {
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [modalLabel, setModalLabel] = useState<SigninState>('first');
  const [siginInfo, setSignInfo] = useState<SigninDto>({
    accountId: '',
    password: '',
  });
  const [siginErr, setSignErr] = useState<SigninErr>({
    accountId: { msg: '', boo: false },
    password: { msg: '', boo: false },
  });

  const setStateErr = useCallback((errMsg: ErrorType, keyId: string) => {
    setSignErr((prev) => {
      return { ...prev, [keyId]: errMsg };
    });
  }, []);

  const setState = useCallback((txt: string, keyId: string) => {
    setSignInfo((prev) => {
      return { ...prev, [keyId]: txt };
    });
  }, []);

  const btnDisabled = useCallback(() => {
    for (const k in siginInfo) {
      if (Object.prototype.hasOwnProperty.call(siginInfo, k)) {
        const el = siginInfo[k];
        // 값이 없을 때
        if (!el) {
          setDisabled(true);
          return;
        } else {
          // 값이 있지만 유효성 검사에 통과 하지 못 했을때
          for (const i in siginErr) {
            if (Object.prototype.hasOwnProperty.call(siginErr, i)) {
              const er = siginErr[i];
              if (er.boo) {
                setDisabled(true);
                return;
              }
            }
          }
        }
      }
    }
    setDisabled(false);
  }, [siginErr, siginInfo]);

  const handleClose = useCallback(() => {
    setModalLabel('first');
    setModalOn(false);
  }, []);

  const onOpenModal = useCallback((label: SigninState) => {
    setModalLabel(label);
    setModalOn(true);
  }, []);

  useEffect(() => {
    btnDisabled();
  }, [btnDisabled]);

  useEffect(() => {
    const cookieId = getCookie('accountId');
    if (cookieId) {
      setSignInfo((prec) => {
        return {
          ...prec,
          ['accountId']: cookieId as string,
        };
      });
    }
  }, []);
  return {
    modalOn,
    disabled,
    modalLabel,
    siginInfo,
    siginErr,
    onOpenModal,
    handleClose,
    setState,
    setStateErr,
  };
};
export default useSignin;
