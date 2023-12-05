import React from 'react';
import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import { RequestFilterProvider } from '@hooks/contexts/filters/RequestFilterContext';
import dynamic from 'next/dynamic';

const RequestPage = dynamic(
  () => import('../../components/preparation/request/RequestPage'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

const Request = () => {
  return (
    <RequestFilterProvider>
      <div>
        <Gnb />
        <WLayout>
          <RequestPage />
        </WLayout>
      </div>
    </RequestFilterProvider>
  );
};

export default Request;
