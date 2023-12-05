/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useState } from 'react';
import { DataPagition, FilterDateType, FilterValue } from './type';
import useFilter from '@hooks/utils/filter/useFilter';
import { DateRange } from '@mui/x-date-pickers-pro';

const RequestFilterContext = createContext<{
  filter: DataPagition;
  setInFilter: (value: FilterValue, keyId: string) => void;
  date: DateRange<dayjs.Dayjs>;
  setInDate: (date: DateRange<dayjs.Dayjs>) => void;
}>({
  filter: {
    page: 0,
    keyword: '',
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

const RequestFilterProvider = ({ children }: Props): JSX.Element => {
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>([
    dayjs(),
    dayjs().add(1, 'day'),
  ]);
  const [filter, setFilter] = useState<DataPagition>({
    page: 0,
    keyword: '',
  });

  const { setInFilter, setInDate } = useFilter({
    url: '/preparation/request',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
  });

  return (
    <RequestFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </RequestFilterContext.Provider>
  );
};

export { RequestFilterContext, RequestFilterProvider };
