import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/utils/useValidation';
import WTextField from '../index';
import { commaAdd, commaRemove } from '@utils/formatNumber';

const WPaymentsTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const prefix = '원';
  const valid = useValidation();

  const onFocusIn = useCallback(() => {
    if (state !== '') {
      const last = state.slice(0, -1);
      setState(last, keyId);
    }
  }, [keyId, setState, state]);

  const onFocusOut = useCallback(() => {
    if (state !== '') {
      const value = state + prefix;
      setState(value, keyId);
    }
  }, [keyId, setState, state]);

  const onValid = useCallback(
    (txt: string) => {
      if (!txt) {
        setErr(
          { msg: '0원 또는 100원 이상 입력이 가능합니다.', boo: true },
          keyId,
        );
        return;
      } else {
        const number = Number(commaRemove(txt));
        if (number <= 1990000) {
          if (number < 100) {
            if (number === 0) {
              setErr({ msg: '', boo: false }, keyId);
            } else {
              setErr(
                {
                  msg: '0원 또는 100원 이상 입력이 가능합니다.',
                  boo: true,
                },
                keyId,
              );
            }
          } else {
            setErr({ msg: '', boo: false }, keyId);
          }
        } else {
          setErr({ msg: '199만원까지 입력이 가능합니다.', boo: true }, keyId);
        }
      }
    },
    [keyId, setErr],
  );

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 9) {
        if (valid.regExpExpenses.test(value)) {
          const comma = commaAdd(value);
          setState(comma, keyId);
          onValid(comma);
        } else {
          setErr({ msg: '금액을 입력해주세요.', boo: true }, keyId);
        }
      }
    },
    [keyId, onValid, setErr, setState, valid.regExpExpenses],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      focusInEvent={onFocusIn}
      focusOutEvent={onFocusOut}
      error={err}
      disabled={disabled}
      placeholder="0원"
      onKeyDown={props.onKeyDown}
      sx={{
        '& .MuiOutlinedInput-input': {
          textAlign: 'end',
        },
      }}
    />
  );
};

WPaymentsTextField.defaultProps = {
  disabled: false,
};

export default WPaymentsTextField;
