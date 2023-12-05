import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import WSelect, { OptionType } from '..';

const WSelectNotice = (props: {
  value?: string;
  callBack: (id: string) => void;
}) => {
  const option: OptionType[] = [
    { id: 'DEFULT', name: '전체' },
    { id: 'NOTICE', name: '공지' },
    { id: 'UPDATE', name: '업데이트' },
  ];
  const [state, setState] = useState<string>(option[0].id);
  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setState(value);
    if (value === 'DEFULT') {
      props.callBack('');
    } else {
      props.callBack(value);
    }
  };

  useEffect(() => {
    if (props.value) {
      setState(props.value);
    }
  }, [props.value]);

  return (
    <WSelect
      name={'expenses'}
      value={state}
      width={'126px'}
      onChange={onSelectOption}
      options={option}
    />
  );
};

export default WSelectNotice;
