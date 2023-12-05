import { FilterNoticeType } from '@hooks/contexts/filters/type';
import { useQuery } from 'react-query';
import { apiPharmacyAdminMyinfo } from '..';
import { MYINFO } from '../queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

const useMyinfo = () => {
  const { data, isError, isLoading } = useQuery(MYINFO, async () => {
    return await apiPharmacyAdminMyinfo();
  });
  const code = data?.data.code;

  const { isWarning } = useCodeWarningEffect({ code: code });

  return { data, isError, isLoading, isWarning };
};

export default useMyinfo;
