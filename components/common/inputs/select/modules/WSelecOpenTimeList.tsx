import { dayToTimeListUp } from '@utils/date';
import WSelect, { OptionType, WSelectCustomizeType } from '..';
import useSelect from '@hooks/utils/useSelect';

const WSelecOpenTimeList = (props: WSelectCustomizeType) => {
  const { value, callBack, disabled, name } = props;
  const timeList = dayToTimeListUp({
    start: '00',
    end: '24',
    Interval: 30,
    viewFormat: 'HH:mm',
    IdFormat: 'HHmm',
    ListFormat: 'single',
  });

  const options: OptionType[] = timeList.map((item) => {
    return { id: item.id, name: item.name };
  });
  const { option, onSelectOption } = useSelect({
    defultId: options[0].id,
    value: value,
    callBack: callBack,
  });

  const timeLast: OptionType = {
    name: '24:00',
    id: JSON.stringify('2400'),
  };
  const singleTimeList = [...options, timeLast];

  return (
    <WSelect
      name={name}
      value={option}
      width={'100% !important'}
      height={'200px'}
      onChange={onSelectOption}
      options={singleTimeList}
      disabled={disabled}
      sx={{
        color: '#000',
        padding: '0px',
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
        },
        '&.Mui-disabled': {
          backgroundColor: '#ebeced',
          color: '#ddd',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ebeced',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ebeced',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 0,
          '&:hover': {
            border: 0,
          },
        },
        '& .MuiSvgIcon-root': {
          display: 'none',
        },
        '& .MuiSelect-select': {
          padding: '0px 0',
          textAlign: 'center',
          color: '#000',
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4ac6ff',
            border: 0,
          },
        },
      }}
    />
  );
};

export default WSelecOpenTimeList;
