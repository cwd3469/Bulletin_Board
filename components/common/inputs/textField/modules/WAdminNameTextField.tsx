import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';

const WAdminNameTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '이름을 정확히 입력해 주세요.',
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
      if (value.length <= 5) {
        if (valid.regNameKo.test(value)) {
          setState(value, keyId);
          if (valid.regExpAdminNameVerify.test(value)) {
            if (value.length < 2) {
              errMsg();
            } else {
              passMsg();
            }
          } else {
            errMsg();
          }
        } else {
          errMsg();
        }
      }
    },
    [
      errMsg,
      keyId,
      passMsg,
      setState,
      valid.regExpAdminNameVerify,
      valid.regNameKo,
    ],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      error={err}
      disabled={disabled}
      placeholder="한글 2~5자리"
      onKeyDown={props.onKeyDown}
    />
  );
};

WAdminNameTextField.defaultProps = {
  disabled: false,
};

export default WAdminNameTextField;
