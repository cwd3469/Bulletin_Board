/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { FilterDateType, FilterHistoryType, FilterValue } from './type';
import { DateRange } from '@mui/x-date-pickers-pro';
import useFilter from '@hooks/utils/filter/useFilter';

const HistoryFilterContext = createContext<{
  filter: FilterHistoryType;
  setInFilter: (value: FilterValue, keyId: string) => void;
  date: DateRange<dayjs.Dayjs>;
  setInDate: (date: DateRange<dayjs.Dayjs>) => void;
}>({
  filter: {
    page: 0,
    keyword: '',
    medicineStatus: 'COMPLETED',
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

const HistoryFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterHistoryType>({
    page: 0,
    keyword: '',
    medicineStatus: 'COMPLETED',
  });
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>([
    dayjs(),
    dayjs().add(7, 'day'),
  ]);

  const { setInFilter, setInDate } = useFilter({
    url: '/preparation/history',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
  });

  return (
    <HistoryFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </HistoryFilterContext.Provider>
  );
};

export { HistoryFilterContext, HistoryFilterProvider };
