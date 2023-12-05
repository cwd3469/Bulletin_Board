import { useCallback, useEffect, useState } from 'react';
import signupInfo from '../signup/jsons/signupInfo.json';
import { mobileFormat } from '@utils/formatNumber';
import {
  SignupInfo,
  SignupInfoError,
  SignupInfoValue,
  SignupStepThreeType,
} from '../signup/type';
import { ErrorType } from '@components/common/inputs/type';

const useSignup = (props: SignupStepThreeType) => {
  const { open, handleClose, mobileValue } = props;
  const originData = JSON.parse(JSON.stringify(signupInfo));
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [info, setInfo] = useState<SignupInfo>(originData.data);
  const [infoErr, setInfoErr] = useState<SignupInfoError>(originData.errs);
  const [btnDisable, setBtnDisable] = useState<boolean>(true);

  /**useSignup info updata 기능*/
  const setInInfo = useCallback((value: SignupInfoValue, keyId: string) => {
    setInfo((prec) => {
      return { ...prec, [keyId]: value };
    });
  }, []);
  /**useSignup infoErr updata 기능*/
  const setInInfoErr = useCallback((err: ErrorType, keyId: string) => {
    setInfoErr((prec) => {
      return { ...prec, [keyId + 'Err']: err };
    });
  }, []);

  /**useSignup info infoErr reset 기능*/
  const reset = useCallback(() => {
    setInfo(originData.data);
    setInfoErr(originData.errs);
    setBtnDisable(true);
  }, [originData]);

  /**useSignup 모달 off 기능*/
  const handleCloseAll = useCallback(() => {
    reset();
    handleClose();
    setModalOn(false);
  }, [handleClose, reset]);

  /**useSignup 계정 상태 알림 모달 on 기능*/
  const handleOpenModal = useCallback(() => {
    setModalOn(true);
  }, []);

  /**useSignup info post update 기능*/
  const addressOnChange = useCallback(
    (address: string, postCode: string) => {
      setInfo({
        ...info,
        ['pharmacyAddress']: address,
        ['postCode']: postCode,
      });
    },
    [info],
  );

  const formChanger = mobileValue ? mobileFormat(mobileValue) : '';

  const disabledOn = useCallback(() => {
    for (const key in info) {
      if (Object.prototype.hasOwnProperty.call(info, key)) {
        if (key !== 'addressDetail') {
          const element = info[key];
          if (element) {
            for (const k in infoErr) {
              if (Object.prototype.hasOwnProperty.call(infoErr, k)) {
                if (k !== 'addressDetailErr') {
                  const el = infoErr[k];
                  if (el.boo) {
                    setBtnDisable(true);
                    return;
                  }
                  if (!el.boo) {
                    setBtnDisable(false);
                  }
                }
              }
            }
          } else {
            setBtnDisable(true);
            return;
          }
        }
      }
    }
  }, [info, infoErr]);

  useEffect(() => {
    disabledOn();
  }, [disabledOn]);

  return {
    formChanger,
    btnDisable,
    infoErr,
    modalOn,
    info,
    open,
    addressOnChange,
    handleCloseAll,
    handleOpenModal,
    setInInfoErr,
    setInInfo,
  };
};

export default useSignup;
