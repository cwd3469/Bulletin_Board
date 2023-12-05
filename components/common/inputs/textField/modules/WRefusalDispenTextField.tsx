import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';

const WRefusalDispenTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '조제 거절 사유를 입력해 주세요.',
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
      if (value.length <= 20) {
        if (valid.regRefusalDispensing.test(value)) {
          setState(value, keyId);
          passMsg();
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regRefusalDispensing],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      onKeyDown={props.onKeyDown}
      error={err}
      focusInEvent={passMsg}
      disabled={disabled}
      placeholder="조제 거절 사유를 입력해 주세요."
    />
  );
};

WRefusalDispenTextField.defaultProps = {
  disabled: false,
};

export default WRefusalDispenTextField;
