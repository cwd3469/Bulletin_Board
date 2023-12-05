import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import SecurityPage from '@components/setting/security/SecurityPage';

const Security = () => {
  return (
    <div>
      <Gnb />
      <WLayout>
        <SecurityPage />
      </WLayout>
    </div>
  );
};

export default Security;
