import { SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';

const useSelect = (props: {
  defultId: string;
  value?: string;
  callBack: (id: string) => void;
}) => {
  const [option, setOption] = useState<string>(props.defultId);

  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setOption(value);
    if (value === 'DEFULT') {
      props.callBack('');
    } else {
      props.callBack(value);
    }
  };

  useEffect(() => {
    if (props.value) {
      setOption(props.value);
    }
  }, [props.value]);

  return { option, onSelectOption };
};

export default useSelect;
