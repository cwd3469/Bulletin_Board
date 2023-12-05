import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { UserInfoContext } from '@hooks/contexts/user/UserInfoContext';
import { useContext, useEffect } from 'react';
export default function Home() {
  const { signOut } = useContext(UserInfoContext);

  useEffect(() => {
    if (signOut) {
      signOut();
    }
  }, [signOut]);
  return (
    <>
      <Gnb />
      <main></main>
    </>
  );
}
