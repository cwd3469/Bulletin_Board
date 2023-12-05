import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import { ProceedFilterProvider } from '@hooks/contexts/filters/ProceedFilterContext';
import dynamic from 'next/dynamic';

const ProceedPage = dynamic(
  () => import('../../components/preparation/proceed/ProceedPage'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

const Proceed = () => {
  return (
    <ProceedFilterProvider>
      <div>
        <Gnb />
        <WLayout>
          <ProceedPage />
        </WLayout>
      </div>
    </ProceedFilterProvider>
  );
};

export default Proceed;
