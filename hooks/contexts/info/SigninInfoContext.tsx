import { SigninInfoType } from '@components/auth/signin/type';
import { createContext, useCallback, useState } from 'react';
import { Props } from '../type';

interface SigninInfoContextType {
  info: SigninInfoType;
  setInInfo: (signinInfo: SigninInfoType) => void;
}

const SigninInfoContext = createContext<SigninInfoContextType>({
  info: {
    verificationCode: '',
    accountMobileNum: '',
  },
  setInInfo(signinInfo) {
    return;
  },
});

const SigninInfoProvider = ({ children }: Props): JSX.Element => {
  const [info, setInfo] = useState<SigninInfoType>({
    verificationCode: '',
    accountMobileNum: '',
  });

  const setInInfo = useCallback((signinInfo: SigninInfoType) => {
    setInfo(signinInfo);
  }, []);

  return (
    <SigninInfoContext.Provider
      value={{
        info,
        setInInfo,
      }}
    >
      {children}
    </SigninInfoContext.Provider>
  );
};

export { SigninInfoContext, SigninInfoProvider };
