import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import { HistoryFilterProvider } from '@hooks/contexts/filters/HistoryFilterContext';
import dynamic from 'next/dynamic';

const HistoryPage = dynamic(
  () => import('../../components/preparation/history/HistoryPage'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

const History = () => {
  return (
    <HistoryFilterProvider>
      <div>
        <Gnb />
        <WLayout>
          <HistoryPage />
        </WLayout>
      </div>
    </HistoryFilterProvider>
  );
};

export default History;
