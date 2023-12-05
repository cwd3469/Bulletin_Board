/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useState } from 'react';
import { FilterProceedType, FilterValue } from './type';
import useFilter from '@hooks/utils/filter/useFilter';
import { DateRange } from '@mui/x-date-pickers-pro';

const ProceedFilterContext = createContext<{
  filter: FilterProceedType;
  setInFilter: (value: FilterValue, keyId: string) => void;
  date: DateRange<dayjs.Dayjs>;
  setInDate: (date: DateRange<dayjs.Dayjs>) => void;
}>({
  filter: {
    page: 0,
    keyword: '',
    medicineStatus: '',
  },
  setInFilter: (value: FilterValue, keyId: string) => {
    return;
  },
  date: [dayjs(), dayjs().add(1, 'day')],
  setInDate: (date: DateRange<dayjs.Dayjs>) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ProceedFilterProvider = ({ children }: Props): JSX.Element => {
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>([
    dayjs(),
    dayjs().add(1, 'day'),
  ]);
  const [filter, setFilter] = useState<FilterProceedType>({
    page: 0,
    keyword: '',
    medicineStatus: '',
  });

  const { setInFilter, setInDate } = useFilter({
    url: '/preparation/proceed',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
  });

  return (
    <ProceedFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </ProceedFilterContext.Provider>
  );
};

export { ProceedFilterContext, ProceedFilterProvider };
