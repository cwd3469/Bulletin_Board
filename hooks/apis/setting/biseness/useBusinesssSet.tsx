import { WeekDataBundlePharmacy } from '@components/setting/businessHour/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { apiBusinesssSet, BUSINESS } from '.';

const useBusinesssSet = () => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();

  const { data, isError, isLoading } = useQuery(BUSINESS(), async () => {
    return await apiBusinesssSet();
  });
  const code = data?.data.code;
  const businessData: WeekDataBundlePharmacy | undefined = isLoading
    ? undefined
    : isError
    ? undefined
    : code === '0000'
    ? data?.data.data
    : undefined;

  useEffect(() => {
    if (data) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'info');
      }
    }
  }, [code, data, msg, toast]);

  const weeks = [
    {
      en: 'mondayOperation',
      ko: '월요일',
    },
    {
      en: 'tuesdayOperation',
      ko: '화요일',
    },
    {
      en: 'wednesdayOperation',
      ko: '수요일',
    },
    {
      en: 'thursdayOperation',
      ko: '목요일',
    },
    {
      en: 'fridayOperation',
      ko: '금요일',
    },
    {
      en: 'saturdayOperation',
      ko: '토요일',
    },
    {
      en: 'sundayOperation',
      ko: '일요일',
    },
    {
      en: 'holidayOperation',
      ko: '공휴일',
    },
  ];

  return { businessData, weeks };
};

export default useBusinesssSet;
