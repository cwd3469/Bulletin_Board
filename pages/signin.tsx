import { SigninInfoProvider } from '@hooks/contexts/info/SigninInfoContext';
import { UserInfoContext } from '@hooks/contexts/user/UserInfoContext';
import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';

const AuthPage = dynamic(() => import('../components/auth/AuthPage'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Signin = () => {
  const { deleteToken } = useContext(UserInfoContext);

  useEffect(() => {
    if (deleteToken) {
      deleteToken();
    }
  }, [deleteToken]);
  return (
    <SigninInfoProvider>
      <main>
        <AuthPage />
      </main>
    </SigninInfoProvider>
  );
};

export default Signin;
