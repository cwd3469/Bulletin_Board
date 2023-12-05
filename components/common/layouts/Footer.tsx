import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Theme,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import wau_logo from 'public/assets/logo/be_plus_health_care_logo.png';
import { borderRight, SxProps } from '@mui/system';
import { FlexBtwR, FlexCenterR, FlexStartR } from '@styles/flexGrid';
import WSubTitle from '../typography/WSubTitle';
import { FlexCenter } from './styled';

export const FooterGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
}));

export const FooterTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: '#777',
  paddingRight: '9px',
  borderRight: '1px solid #f2f2f2',
  lineHeight: '16px',
  letterSpacing: '-0.16px',
}));

export const FooterButton = styled(Button)(({ theme }) => ({
  ...theme.typography.body2,
  color: '#666',
  lineHeight: '16px',
  letterSpacing: '-0.16px',
  padding: '0px',
}));

const Footer = (props: { sx?: SxProps<Theme> }) => {
  const onPressPartner = () => {
    window.open('/terms/partner-agree');
  };
  const onPressPrivacy = () => {
    window.open('/terms/privacy-agree');
  };
  const onPressPrivacyPolicy = () => {
    window.open('/terms/privacy-policy');
  };
  return (
    <Stack gap={'24px'} sx={props.sx} width="900px">
      <Grid container gap="32px" className="footerNav">
        <FooterButton onClick={onPressPrivacyPolicy}>
          개인정보 보호 의무 동의
        </FooterButton>
        <FooterButton onClick={onPressPrivacy}>
          개인정보 처리 동의서
        </FooterButton>
        <FooterButton onClick={onPressPartner}>파트너사 이용약관</FooterButton>
      </Grid>
      <FlexBtwR>
        <Box width="248px" className="footerIconBox">
          <Image src={wau_logo} alt="wau_logo" />
        </Box>
        <FlexCenterR gap="8px" width="auto">
          <Typography variant="h6">고객센터</Typography>
          <Box />
          <Typography color="#575f6a" variant="subtitle1">
            1533-1451
          </Typography>
          <Typography color="#575f6a">
            (09:00 ~ 18:00 / 토, 일, 공휴일 휴무)
          </Typography>
        </FlexCenterR>
      </FlexBtwR>
      <Stack gap={'14px'} className="footerContents">
        <Grid container className="footerContentsTop" gap={'14px'}>
          <FooterGrid>
            <FooterTypography>(주) 비플러스헬스케어</FooterTypography>
            <FooterTypography>대표자 : 정훈재, 허기준, 이상학</FooterTypography>
            <FooterTypography>사업자등록번호:877-88-00688</FooterTypography>
          </FooterGrid>
          <FooterGrid></FooterGrid>
        </Grid>
        <FooterGrid>
          <FooterTypography>
            주소 : 강원도 춘천시 남산면 버들1길 130, 복지후생동 4층
          </FooterTypography>

          <FooterTypography>
            통신판매업 신고번호 : 제 2021-강원춘천-0915호
          </FooterTypography>
        </FooterGrid>
      </Stack>
      <Stack gap="16px" className="footerCopyright">
        <Box borderTop="1px solid #eee" />
        <FooterTypography color="#888">
          Copyright 2023 비플러스케어 All rights reserved.
        </FooterTypography>
      </Stack>
    </Stack>
  );
};

export default Footer;
