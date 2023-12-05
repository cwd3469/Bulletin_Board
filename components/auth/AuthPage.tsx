import { Stack } from '@mui/material';
import FindAccount from './findAccount/FindAccount';
import SigninPage from './signin/SigninPage';
import Signup from './signup/Signup';
import { SigninLayout } from './styled';

const AuthPage = () => {
  return (
    <SigninLayout>
      <Stack>
        <SigninPage />
        <Stack borderTop={'1px solid #e3e3e3'} paddingTop="15px" gap="10px">
          <Signup />
          <FindAccount />
        </Stack>
      </Stack>
    </SigninLayout>
  );
};

export default AuthPage;
