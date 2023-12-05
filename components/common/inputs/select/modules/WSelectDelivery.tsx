import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import WSelect, { OptionType } from '..';

const WSelectDelivery = (props: {
  value?: string;
  callBack: (id: string, keyId: string) => void;
}) => {
  const option: OptionType[] = [
    { id: 'DEFULT', name: '배송 상태 전체' },
    { id: 'IN_PREPARE', name: '배송 준비중' },
    { id: 'WAITING', name: '배송 대기' },
    { id: 'IN_DELIVERY', name: '배송 중' },
    { id: 'COMPLETED', name: '배송 완료' },
  ];
  const [state, setState] = useState<string>(option[0].id);
  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setState(value);
    props.callBack(value === 'DEFULT' ? '' : value, 'deliveryStatus');
  };
  useEffect(() => {
    if (props.value) {
      setState(props.value);
    }
  }, [props.value]);
  return (
    <WSelect
      name={'wSelectDelivery'}
      value={state}
      width={'126px'}
      onChange={onSelectOption}
      options={option}
    />
  );
};

export default WSelectDelivery;
