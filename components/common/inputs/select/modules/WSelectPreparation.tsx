import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import WSelect, { OptionType } from '..';

const WSelectPreparation = (props: {
  value?: string;
  callBack: (id: string, keyId: string) => void;
}) => {
  const option: OptionType[] = [
    { id: 'COMPLETED', name: '조제 완료' },
    { id: 'REFUSE', name: '조제 거절' },
  ];
  const [state, setState] = useState<string>(option[0].id);
  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setState(value);
    props.callBack(value, 'medicineStatus');
  };
  useEffect(() => {
    if (props.value) {
      setState(props.value);
    }
  }, [props.value]);
  return (
    <WSelect
      name={'wSelectPreparation'}
      value={state}
      width={'98px'}
      onChange={onSelectOption}
      options={option}
    />
  );
};

export default WSelectPreparation;
