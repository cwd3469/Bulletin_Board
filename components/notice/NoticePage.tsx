import WPagination from '@components/common/button/WPagination';
import useNoticeList from '@hooks/apis/notion/hooks/useNotice';
import { NoticeFilterContext } from '@hooks/contexts/filters/NoticeFilterContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import NoticeFilter from './modules/NoticeFilter';
import NoticeTable from './modules/NoticeTable';
import { loadingErrorFallbackList } from '@components/common/api/LoadingErrorFallback';

const NoticePage = () => {
  const { filter, setInFilter } = useContext(NoticeFilterContext);
  const { data, isError, isLoading, isWarning } = useNoticeList();
  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };

  const info = loadingErrorFallbackList({
    data: data,
    isError: isError,
    isLoading: isLoading,
    isWarning: isWarning,
  });

  return (
    <Stack gap="20px">
      <NoticeFilter />
      <NoticeTable data={info.contents} />
      <WPagination
        paddingTop="4px"
        page={filter.page + 1}
        pagination={pagination}
        count={info.totalPages}
      />
    </Stack>
  );
};

export default NoticePage;
