import {
  FilterAllOtions,
  FilterDateType,
  FilterValue,
} from '@hooks/contexts/filters/type';
import { transQueryDate, transQueryUrl } from '@utils/transtext';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import useFilterEffect from './useFilterEffect';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

interface UseFilterType {
  url: string;
  date?: DateRange<dayjs.Dayjs>;
  setDate?: Dispatch<SetStateAction<DateRange<dayjs.Dayjs>>>;
  filter?: FilterAllOtions;
  setFilter?: Dispatch<SetStateAction<FilterAllOtions>>;
}
const useFilter = (props: UseFilterType) => {
  const router = useRouter();

  /**useFilter 라우터 qush 기능*/
  const routeUrl = useCallback(
    (keyId: string, day: string) => {
      const query = `${keyId}${day}`.substring(1);
      router.push(`${props.url}?${query}`);
    },
    [props.url, router],
  );

  /**useFilter date 업로드 기능*/
  const setInDate = useCallback(
    (date: DateRange<dayjs.Dayjs>) => {
      if (props.date && props.setDate) {
        const reDate = date;
        props.setDate(reDate);
        const key = props.filter ? transQueryUrl(props.filter) : '';
        const day = transQueryDate(date);
        routeUrl(key, day);
      }
    },
    [props, routeUrl],
  );

  /**useFilter filter 업로드 기능*/
  const setInFilter = useCallback(
    (value: FilterValue, keyId: string) => {
      if (props.filter && props.setFilter) {
        const reFilter = { ...props.filter, [keyId]: value };
        props.setFilter(reFilter);
        const key = transQueryUrl(reFilter);
        const day = props.date ? transQueryDate(props.date) : '';
        routeUrl(key, day);
      }
    },
    [props, routeUrl],
  );

  useFilterEffect({
    filter: props.filter,
    setFilter(filterState) {
      if (props.setFilter) {
        props.setFilter(filterState);
      }
    },
    setDate(rang) {
      if (props.setDate) {
        props.setDate(rang);
      }
    },
  });

  return { setInFilter, setInDate };
};

export default useFilter;
