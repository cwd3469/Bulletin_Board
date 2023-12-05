import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';

interface WRepwTextFieldType extends WTextFieldModulesType {
  pw: string;
}

const WRepwTextField = (props: WRepwTextFieldType) => {
  const { state, setState, keyId, err, setErr, disabled, pw } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '비밀번호가 일치하지 않아 다시 확인해 주세요.',
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

  const onFocusOut = useCallback(
    (value: string) => {
      if (value === pw) {
        passMsg();
      } else {
        errMsg();
      }
    },
    [errMsg, passMsg, pw],
  );

  //임시 비밀번호 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 16) {
        setState(value, keyId);
        if (valid.regPwFormChack.test(value)) {
          onFocusOut(value);
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, onFocusOut, setState, valid.regPwFormChack],
  );

  return (
    <WTextField
      type="password"
      value={stateTxt}
      onChange={onChangeInfo}
      onKeyDown={props.onKeyDown}
      disabled={disabled}
      error={err}
      maxRows={16}
      placeholder="비밀번호 재입력"
    />
  );
};

WRepwTextField.defaultProps = {
  disabled: false,
};

export default WRepwTextField;
