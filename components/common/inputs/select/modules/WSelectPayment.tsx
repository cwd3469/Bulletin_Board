import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import WSelect, { OptionType } from '..';

const WSelectPayment = (props: {
  value?: string;
  callBack: (id: string, keyId: string) => void;
}) => {
  const option: OptionType[] = [
    { id: 'DEFULT', name: '조제 전체' },
    { id: 'IN_PREPARE', name: '조제 중' },
    { id: 'OUTSTANDING', name: '결제 대기' },
  ];
  const [state, setState] = useState<string>(option[0].id);
  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setState(value);
    props.callBack(value === 'DEFULT' ? '' : value, 'medicineStatus');
  };
  useEffect(() => {
    if (props.value) {
      setState(props.value);
    }
  }, [props.value]);
  return (
    <WSelect
      name={'wSelectPayment'}
      value={state}
      width={'126px'}
      onChange={onSelectOption}
      options={option}
    />
  );
};

export default WSelectPayment;
