import { Box, styled, SxProps, Theme } from '@mui/material';
import WauLogo from 'public/assets/logo/new_logo_01@3x.png';
import Image from 'next/image';
import { Container, FlexCenter, ImageBox } from './styled';

interface LogoType {
  width?: string;
  sx?: SxProps<Theme>;
}

export const Logo = (props: LogoType) => {
  const { width, sx } = props;
  return (
    <ImageBox width={width ? width : '130px'} sx={sx}>
      <Image src={WauLogo} alt="로고" layout="fill" />
    </ImageBox>
  );
};

export const WLayout = (props: {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  bg?: string;
  containerColor?: string;
  sx?: SxProps<Theme>;
}) => {
  const { children, bg, containerColor, sx } = props;
  return (
    <FlexCenter sx={{ backgroundColor: bg ? bg : '#f8f8f8' }}>
      <Container
        sx={{
          backgroundColor: containerColor ? containerColor : '#f8f8f8',
          ...sx,
        }}
      >
        {children}
      </Container>
    </FlexCenter>
  );
};

export const WBoxLayout = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  height: '706px',
}));
