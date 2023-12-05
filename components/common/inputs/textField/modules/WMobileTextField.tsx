import React, { useCallback } from 'react';
import useValidation from '@hooks/utils/useValidation';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';
import { mobileFormat, mobileFormatOff } from '@utils/formatNumber';

const WMobileTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled, onKeyDown } = props;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setErr(
      {
        msg: '11자리의 휴대폰 번호를 입력해 주세요',
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
      if (txt.length <= 13) {
        if (txt.length > 3 && txt.substring(0, 3) !== '010') {
          errMsg();
          return;
        } else {
          if (valid.regExpMobileNumber.test(txt)) {
            const hyphen = mobileFormat(txt);
            const unHyphen = mobileFormatOff(txt);
            setState(hyphen, keyId);
            if (unHyphen.length == 11) {
              passMsg();
            } else {
              if (unHyphen.length === 0) {
                passMsg();
                return;
              }
              errMsg();
            }
            return;
          } else {
            errMsg();
          }
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regExpMobileNumber],
  );

  return (
    <WTextField
      value={state}
      onChange={onChangeInfo}
      placeholder={'알림 톡을 연락받을 번호를 입력해 주세요.'}
      disabled={disabled}
      error={err}
      onKeyDown={onKeyDown}
      sx={{
        '& .input-msg': {
          padding: '2px 0 2px',
          height: '16px',
        },
      }}
    />
  );
};

WMobileTextField.defaultProps = {
  disabled: false,
};

export default WMobileTextField;
