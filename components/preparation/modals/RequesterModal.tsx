import { BoxDisabledText } from '@components/common/box/modules/TextBox';
import { ModalType } from '@components/common/layouts/gnb/types';
import WAlert from '@components/common/modals/WAlert';
import WSubTitle from '@components/common/typography/WSubTitle';
import { Stack } from '@mui/material';
import { mobileFormat } from '@utils/formatNumber';
import { ReceiveData } from '../request/modules/RequestTable';

interface RequesterModalType extends ModalType {
  receiveData?: ReceiveData;
}

const RequesterModal = (props: RequesterModalType) => {
  const { open, handleClose, receiveData } = props;
  return (
    <WAlert
      open={open}
      handleClose={handleClose}
      title="요청자 정보"
      maxWidth="sm"
      activeOn
      titleSx={{ padding: '50px 48px 40px' }}
    >
      {receiveData ? (
        <Stack gap="16px" paddingBottom="40px">
          <Stack>
            <WSubTitle title="이름" />
            <BoxDisabledText
              sx={{ padding: '14px 0px', backgroundColor: '#fff' }}
            >
              {receiveData.receiveNameKo}
            </BoxDisabledText>
          </Stack>
          <Stack>
            <WSubTitle title="휴대폰 번호" />
            <BoxDisabledText
              sx={{ padding: '14px 0px', backgroundColor: '#fff' }}
            >
              {mobileFormat(receiveData.receivePhoneNum)}
            </BoxDisabledText>
          </Stack>
          <Stack>
            <WSubTitle title="주소" />
            <BoxDisabledText
              sx={{ padding: '14px 0px', backgroundColor: '#fff' }}
            >
              {receiveData.receiveAddrKo} {receiveData.receiveAddrDetailKo}{' '}
              {receiveData.receiveZipCode}
            </BoxDisabledText>
          </Stack>
        </Stack>
      ) : (
        <Stack height="300px"></Stack>
      )}
    </WAlert>
  );
};

export default RequesterModal;
