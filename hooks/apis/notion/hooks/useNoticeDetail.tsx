import { useQuery } from 'react-query';
import { apiNoticeDetail } from '..';
import { NOTICEDETAIL } from '../queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

const useNoticeDetail = (parms: string) => {
  const { data, isError, isLoading } = useQuery(
    NOTICEDETAIL(parms),
    async () => {
      return await apiNoticeDetail(parms);
    },
  );
  const code = data?.data.code;

  const { isWarning } = useCodeWarningEffect({ code: code });

  return { data, isError, isLoading, isWarning };
};

export default useNoticeDetail;
