import React, { useCallback, useEffect, useState } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { ErrorType } from '@components/common/inputs/type';

type PassWordType = {
  [key: string]: string;
  pw: string;
  repw: string;
};
type PassWordErrType = {
  [key: string]: ErrorType;
  pwErr: ErrorType;
  repwErr: ErrorType;
};

const useChangePw = () => {
  const errMsg = useCallback(() => {
    const msg = {
      msg: '',
      boo: false,
    };
    return msg;
  }, [])();

  const validation = useValidation();
  const [state, setState] = useState<PassWordType>({ pw: '', repw: '' });
  const [errs, setErrs] = useState<PassWordErrType>({
    pwErr: errMsg,
    repwErr: errMsg,
  });
  const [disable, setDisabled] = useState<boolean>(true);

  const setInInfo = useCallback((value: string, keyId: string) => {
    setState((prec) => {
      return { ...prec, [keyId]: value };
    });
  }, []);
  const setInInfoErr = useCallback((err: ErrorType, keyId: string) => {
    setErrs((prec) => {
      return { ...prec, [keyId + 'Err']: err };
    });
  }, []);
  const disabledOn = useCallback(() => {
    for (const key in state) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        const element = state[key];
        if (element) {
          for (const k in errs) {
            if (Object.prototype.hasOwnProperty.call(errs, k)) {
              const el = errs[k];
              if (el.boo) {
                setDisabled(true);
                return;
              }
              if (!el.boo) {
                setDisabled(false);
              }
            }
          }
        } else {
          setDisabled(true);
          return;
        }
      }
    }
  }, [errs, state]);

  useEffect(() => {
    disabledOn();
  }, [disabledOn]);

  return {
    state,
    errs,
    disable,
    setInInfo,
    setInInfoErr,
  };
};

export default useChangePw;
