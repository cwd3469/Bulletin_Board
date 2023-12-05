import { Box, Stack, Typography } from '@mui/material';
import WAlert from '@components/common/modals/WAlert';
import { ModalType } from '@components/common/layouts/gnb/types';

interface SignupTermsProps extends ModalType {
  html?: JSX.Element;
}

const SignupTerms = (props: SignupTermsProps) => {
  const { open, handleClose, html } = props;

  return (
    <WAlert
      open={open}
      handleClose={handleClose}
      maxWidth="xl"
      activeOn
      btnTextColor="#999"
      title=" 서비스 이용약관 동의"
    >
      <Stack alignItems={'center'} padding="0px 40px">
        <Box
          width={'640px'}
          height={'420px'}
          sx={{ overflowY: 'scroll' }}
          padding={'10px'}
        >
          {html}
        </Box>
        <Box height="41px" />
      </Stack>
    </WAlert>
  );
};

export default SignupTerms;
