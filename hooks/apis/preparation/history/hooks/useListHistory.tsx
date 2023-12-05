import { useContext } from 'react';
import { useQuery } from 'react-query';
import { apiHistoryList } from '..';
import { HISTORY_LIST } from '../queryKey';
import { useRouter } from 'next/router';
import { transQueryDateToString, transQueryUrl } from '@utils/transtext';
import { HistoryFilterContext } from '@hooks/contexts/filters/HistoryFilterContext';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

const useListHistory = () => {
  const { filter, date } = useContext(HistoryFilterContext);
  const router = useRouter();
  const queryUrl = transQueryUrl(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    HISTORY_LIST(router.query),
    async () => {
      return await apiHistoryList(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/preparation/history');
    },
  });

  return { data, isError, isLoading, isWarning };
};

export default useListHistory;
