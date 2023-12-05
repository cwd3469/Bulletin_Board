import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';

const WPharmcyNameTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '가게 명은 영문 대소문자/한글/숫자 조합으로 1~15자리 입니다.',
        boo: true,
      },
      keyId,
    );
  }, [keyId, setErr]);
  const passMsg = useCallback(() => {
    setErr(
      {
        msg: '',
        boo: false,
      },
      keyId,
    );
  }, [keyId, setErr]);

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 15) {
        setState(value, keyId);
        if (valid.regPharmacyName.test(value)) {
          passMsg();
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regPharmacyName],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      focusInEvent={passMsg}
      error={err}
      disabled={disabled}
      placeholder="한글, 숫자, 영어 대소문자 조합 1~15자리"
      onKeyDown={props.onKeyDown}
    />
  );
};

WPharmcyNameTextField.defaultProps = {
  disabled: false,
};

export default WPharmcyNameTextField;
