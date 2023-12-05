import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';

const WPwTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '영문 대소문자/숫자/특수문자 조합으로 8~16자리를 입력해 주세요.',
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
      if (value.length <= 16) {
        setState(value, keyId);
        if (valid.regPwFormChack.test(value)) {
          passMsg();
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regPwFormChack],
  );

  return (
    <WTextField
      type="password"
      value={stateTxt}
      onChange={onChangeInfo}
      disabled={disabled}
      error={err}
      maxRows={16}
      placeholder="영어 대소문자,숫자,특수문자 조합 8~16자리"
      onKeyDown={props.onKeyDown}
    />
  );
};

WPwTextField.defaultProps = {
  disabled: false,
};

export default WPwTextField;
