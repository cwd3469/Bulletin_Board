import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import WTextField from '../index';

const WAddressDetailTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 15) {
        setState(value, keyId);
      }
    },
    [keyId, setState],
  );

  return (
    <WTextField
      value={stateTxt}
      onChange={onChangeInfo}
      error={err}
      disabled={disabled}
      placeholder="상세주소가 없는 경우 주소지 특징 입력"
      onKeyDown={props.onKeyDown}
    />
  );
};

WAddressDetailTextField.defaultProps = {
  disabled: false,
};

export default WAddressDetailTextField;
