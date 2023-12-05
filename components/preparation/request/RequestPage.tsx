import WPagination from '@components/common/button/WPagination';
import useListRequest from '@hooks/apis/preparation/request/hooks/useListRequest';
import { RequestFilterContext } from '@hooks/contexts/filters/RequestFilterContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import RequestFilter from './modules/RequestFilter';
import RequestStatusNoti from './modules/RequestStatusNoti';
import RequestTable from './modules/RequestTable';
import { loadingErrorFallbackList } from '@components/common/api/LoadingErrorFallback';

const RequestPage = () => {
  const { filter, setInFilter } = useContext(RequestFilterContext);
  const { data, isError, isLoading, isWarning } = useListRequest();

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value - 1, 'page');
  };
  const info = loadingErrorFallbackList({
    data: data,
    isError: isError,
    isLoading: isLoading,
    isWarning: isWarning,
  });

  return (
    <Stack gap="10px">
      <Stack gap="10px">
        <RequestStatusNoti totalElements={info.totalElements} />
        <RequestFilter />
      </Stack>
      <RequestTable data={info.contents} />
      <WPagination
        page={filter.page + 1}
        pagination={pagination}
        count={info.totalPages}
      />
    </Stack>
  );
};

export default RequestPage;
