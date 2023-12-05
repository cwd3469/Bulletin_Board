import * as React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import colors from '@styles/colors';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';
import { GnbPopover } from '../styled';
import { UserInfoContext } from '@hooks/contexts/user/UserInfoContext';

export default function GnbMyInfo(props: { disabled?: boolean }) {
  const { disabled } = props;
  const { userInfo, signOut, handleTokenInfo } =
    React.useContext(UserInfoContext);
  const router = useRouter();

  const gnbInfo = React.useCallback(() => {
    const nickname = userInfo ? userInfo.nameKo : '';
    const name = '어디아파 약사 님';
    return { name, nickname };
  }, [userInfo])();

  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const mypageOpen = () => {
    handleTokenInfo();
    router.push({
      pathname: `/myinfo`,
    });
  };

  const signoutOn = () => {
    if (signOut) signOut();
  };

  return (
    <div>
      <Button
        disabled={disabled}
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
        color="info"
        sx={{ padding: '0px', fontWeight: 'bold' }}
      >
        <span>내기본정보</span>
        <ArrowDropDownIcon />
      </Button>
      <GnbPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid
          container
          sx={{
            padding: '28px 20px 12px',
          }}
          flexDirection="column"
          width="200px"
        >
          <Typography variant="h5">{gnbInfo.nickname} 님</Typography>
          <Box height="16px" />
          <Box>
            <Typography variant="body2" lineHeight={'22px'}>
              {gnbInfo.name}
            </Typography>
            <Typography variant="body2" lineHeight={'22px'}>
              환영합니다👋🏻
            </Typography>
          </Box>
          <Box height="32px" />
          <Button
            variant="text"
            sx={{
              color: colors.gray_01,
              backgroundColor: colors.gray_09,
              fontWeight: '700',
              padding: '10px',
              borderRadius: '6px',
            }}
            onClick={mypageOpen}
          >
            기본정보
          </Button>
          <Button
            variant="text"
            sx={{
              color: colors.gray_07,
              padding: '10px',
              '&:hover': {
                backgroundColor: colors.gray_11,
              },
            }}
            onClick={signoutOn}
          >
            로그아웃
          </Button>
        </Grid>
      </GnbPopover>
    </div>
  );
}
