import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import dynamic from 'next/dynamic';

const BusinessHourPage = dynamic(
  () => import('../../components/setting/businessHour/BusinessHourPage'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

const BusinessHour = () => {
  return (
    <div>
      <Gnb />
      <WLayout>
        <BusinessHourPage />
      </WLayout>
    </div>
  );
};

export default BusinessHour;
