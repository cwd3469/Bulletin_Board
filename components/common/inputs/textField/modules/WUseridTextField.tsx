import React, { useCallback } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';

const WUseridTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();

  const successMsg = useCallback(() => {
    setErr(
      {
        msg: '',
        boo: false,
      },
      keyId,
    );
  }, [keyId, setErr]);

  const errorMsg = useCallback(
    () =>
      setErr(
        {
          msg: '영문 소문자 또는 숫자 조합으로 4~20자리를 입력해 주세요.',
          boo: true,
        },
        keyId,
      ),
    [keyId, setErr],
  );
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: txt } = e.target;
      setState(txt, keyId);
      if (valid.regExpId.test(txt)) {
        successMsg();
      } else {
        errorMsg();
      }
    },
    [errorMsg, keyId, setState, successMsg, valid.regExpId],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      placeholder={'영어 소문자 또는 숫자 조합 4~20자리'}
      disabled={disabled ? disabled : false}
      error={err}
      onKeyDown={props.onKeyDown}
    />
  );
};

WUseridTextField.defaultProps = {
  disabled: false,
};

export default WUseridTextField;
