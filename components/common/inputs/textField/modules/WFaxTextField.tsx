import React, { useCallback } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';

const WFaxTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();

  const errMsg = useCallback(() => {
    setErr(
      {
        msg: ' 팩스번호는 숫자 8~12자리 입니다.',
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
      const txt = e.target.value;
      if (txt.length <= 12) {
        if (valid.regExFaxNumber.test(txt)) {
          setState(txt, keyId);
          if (txt.length <= 12 && txt.length >= 8) {
            passMsg();
          } else {
            errMsg();
          }
        } else {
          errMsg();
          return;
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regExFaxNumber],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      placeholder={'숫자 8~12자리'}
      disabled={disabled}
      error={err}
      onKeyDown={props.onKeyDown}
    />
  );
};

WFaxTextField.defaultProps = {
  disabled: false,
};

export default WFaxTextField;
