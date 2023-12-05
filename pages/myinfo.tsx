import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import DomesticMyPage from '@components/myInfo/domestic/DomesticMyPage';

const myinfo = () => {
  return (
    <div>
      <Gnb />
      <WLayout>
        <DomesticMyPage />
      </WLayout>
    </div>
  );
};

export default myinfo;
