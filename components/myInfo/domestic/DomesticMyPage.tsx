import { WBoxLayout } from '@components/common/layouts/WLayout';
import WMainTitle from '@components/common/typography/WMainTitle';
import { Grid } from '@mui/material';
import { FlexCenterC, FlexStartC } from '@styles/flexGrid';
import MyinfoTextBox from '../modules/MyinfoTextBox';
import useMyinfo from '@hooks/apis/myinfo/hooks/useMyinfo';
import LoadingErrorFallback from '@components/common/api/LoadingErrorFallback';
import Footer from '@components/common/layouts/Footer';
import { mobileFormat, phoneFormat } from '@utils/formatNumber';

const DomesticMyPage = () => {
  const { data, isError, isLoading, isWarning } = useMyinfo();

  return (
    <FlexCenterC gap="26px">
      <WMainTitle title="내 정보" />
      <WBoxLayout padding="32px" width="100%">
        <LoadingErrorFallback
          data={data}
          isError={isError}
          isLoading={isLoading}
          isWarning={isWarning}
          contexts={(info) => {
            return (
              <>
                <Grid
                  container
                  width="100%"
                  sx={{ alignItems: 'flex-start', gap: '178px' }}
                >
                  <FlexStartC gap="24px">
                    <MyinfoTextBox title="가게 명">
                      {info.data.data.pharmacyNameKo}
                    </MyinfoTextBox>
                    <MyinfoTextBox title="가게 전화번호">
                      {phoneFormat(info.data.data.pharmacyPhoneNum)}
                    </MyinfoTextBox>
                    <MyinfoTextBox
                      title="가게 주소"
                      sx={{ '& .disabled-text': { minHeight: '62px' } }}
                    >
                      <>
                        {info.data.data.pharmacyAddrKo}{' '}
                        {info.data.data.pharmacyAddrDetailKo}
                      </>
                    </MyinfoTextBox>
                  </FlexStartC>
                  <FlexStartC gap="24px">
                    <MyinfoTextBox title="점장 명">
                      {info.data.data.pharmacistNameKo}
                    </MyinfoTextBox>
                    <MyinfoTextBox title="휴대폰 번호">
                      {mobileFormat(info.data.data.pharmacistPhoneNum)}
                    </MyinfoTextBox>
                    <MyinfoTextBox title="가게 팩스번호">
                      {info.data.data.pharmacyFaxNum}
                    </MyinfoTextBox>
                  </FlexStartC>
                </Grid>
              </>
            );
          }}
        />
      </WBoxLayout>
    </FlexCenterC>
  );
};

export default DomesticMyPage;
