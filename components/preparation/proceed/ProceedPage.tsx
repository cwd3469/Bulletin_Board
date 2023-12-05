import WPagination from '@components/common/button/WPagination';
import useListProceed from '@hooks/apis/preparation/proceed/hooks/useListProceed';
import { ProceedFilterContext } from '@hooks/contexts/filters/ProceedFilterContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import ProceedFilter from './modules/ProceedFilter';
import ProceedStatusNoti from './modules/ProceedStatusNoti';
import ProceedTable from './modules/ProceedTable';
import { loadingErrorFallbackList } from '@components/common/api/LoadingErrorFallback';

const ProceedPage = () => {
  const { filter, setInFilter, date } = useContext(ProceedFilterContext);
  const { data, isError, isLoading, isWarning } = useListProceed();

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
        <ProceedStatusNoti
          totalInPrepareCount={info.totalInPrepareCount}
          totalOutstandingCount={info.totalOutstandingCount}
        />
        <ProceedFilter />
      </Stack>
      <ProceedTable data={info.contents} />
      <WPagination
        page={filter.page + 1}
        pagination={pagination}
        count={info.totalPages}
      />
    </Stack>
  );
};

export default ProceedPage;
