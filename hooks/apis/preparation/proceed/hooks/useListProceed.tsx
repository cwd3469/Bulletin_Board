import { useQuery } from 'react-query';
import { apiProceedList } from '..';
import { PROCEED_LIST } from '../queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { transQueryDateToString, transQueryUrl } from '@utils/transtext';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ProceedFilterContext } from '@hooks/contexts/filters/ProceedFilterContext';

const useListProceed = () => {
  const { filter, date } = useContext(ProceedFilterContext);
  const router = useRouter();
  const queryUrl = transQueryUrl(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    PROCEED_LIST(router.query),
    async () => {
      return await apiProceedList(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/preparation/proceed');
    },
  });

  return { data, isError, isLoading, isWarning };
};

export default useListProceed;
