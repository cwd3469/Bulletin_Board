import { FilterDateType } from '@hooks/contexts/filters/type';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import WDatePicker from '..';
import { stringToDate, stringToDey } from '@utils/date';

const WDatePickerFilter = (props: {
  setInDate: (date: DateRange<Dayjs>) => void;
  date: DateRange<Dayjs>;
}) => {
  const handleDate = (
    date: DateRange<Dayjs>,
    keyboardInputValue?: string | undefined,
  ) => {
    const start = date[0] ? date[0] : date[1];
    const end = date[1] ? date[1] : date[0];
    const rang: DateRange<Dayjs> = [start, end];
    props.setInDate(rang);
  };

  return <WDatePicker date={props.date} selectDate={handleDate} />;
};

export default WDatePickerFilter;
