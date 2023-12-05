import { useQuery } from 'react-query';
import { apiNoticeList } from '..';
import { NOTICELIST } from '../queryKey';
import { useRouter } from 'next/router';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

const useNoticeList = () => {
  const router = useRouter();
  const query = router.query;
  const { data, isError, isLoading } = useQuery(NOTICELIST(query), async () => {
    return await apiNoticeList(query);
  });
  const code = data?.data.code;

  const { isWarning } = useCodeWarningEffect({ code: code });

  return { data, isError, isLoading, isWarning };
};

export default useNoticeList;
