import { FilterAllOtions, FilterDateType } from '@hooks/contexts/filters/type';
import { DateRange } from '@mui/x-date-pickers-pro';
import { stringToDey } from '@utils/date';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UseFilterEffectType {
  filter?: FilterAllOtions;
  setFilter?: (filterState: FilterAllOtions) => void;
  setDate?: (rang: DateRange<Dayjs>) => void;
  setDateString?: (date: FilterDateType) => void;
}

const useFilterEffect = (props: UseFilterEffectType) => {
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    const {
      keyword,
      page,
      type,
      title,
      startDate,
      endDate,
      medicineStatus,
      deliveryStatus,
    } = query;

    if (props.filter) {
      if (props.setFilter) {
        let reFilter: FilterAllOtions = props.filter;
        if (page) {
          reFilter = {
            ...reFilter,
            ['page']: Number(page as string),
          };
        }
        if (medicineStatus) {
          reFilter = {
            ...reFilter,
            ['medicineStatus']: medicineStatus as string,
          };
        }
        if (deliveryStatus) {
          reFilter = {
            ...reFilter,
            ['deliveryStatus']: deliveryStatus as string,
          };
        }
        if (type) {
          reFilter = {
            ...reFilter,
            ['type']: type as string,
          };
        }
        if (title) {
          reFilter = {
            ...reFilter,
            ['title']: title as string,
          };
        }
        if (keyword) {
          reFilter = {
            ...reFilter,
            ['keyword']: keyword as string,
          };
        }
        props.setFilter(reFilter);
      }
    }

    if (startDate && endDate) {
      const start = stringToDey(startDate as string);
      const end = stringToDey(endDate as string);
      const range: DateRange<Dayjs> = [start, end];
      if (props.setDate) {
        props.setDate(range);
      }

      const dayString: FilterDateType = {
        startDate: startDate as string,
        endDate: endDate as string,
      };
      if (props.setDateString) {
        props.setDateString(dayString);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
};

export default useFilterEffect;
