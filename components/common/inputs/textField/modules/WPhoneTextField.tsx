import React, { useCallback } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';
import { mobileFormatOff, phoneFormat } from '@utils/formatNumber';

const WPhoneTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled, onKeyDown } = props;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: ' 전화번호는 숫자 8~12자리 입니다.',
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
      if (txt.length <= 14) {
        if (valid.regExpPhoneNumber.test(txt)) {
          const hyphen = phoneFormat(txt);
          const unHyphen = mobileFormatOff(txt);
          setState(hyphen, keyId);
          if (unHyphen.length >= 8 && unHyphen.length <= 13) {
            passMsg();
          } else {
            errMsg();
          }
          return;
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regExpPhoneNumber],
  );

  return (
    <WTextField
      value={state}
      onChange={onChangeInfo}
      placeholder={'숫자 8~12자리'}
      disabled={disabled}
      error={err}
      onKeyDown={onKeyDown}
    />
  );
};

WPhoneTextField.defaultProps = {
  disabled: false,
};

export default WPhoneTextField;
