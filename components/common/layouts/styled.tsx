import { UserInfoContext } from '@hooks/contexts/user/UserInfoContext';
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuProps,
  Popover,
  styled,
} from '@mui/material';
import colors from '@styles/colors';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CSSProperties, useContext } from 'react';

export const FlexCenter = styled(Grid)(({ theme }) => ({
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
}));

export const ImageBox = styled(Box)({
  position: 'relative',
});

export const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  width: '1200px',
  padding: '36px 0px 5px',
}));

export const GnbNavList = styled(Grid)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  padding: '10px 0',
}));

export const FlexSpaceBetween = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
}));

export const GnbPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
    borderRadius: '12px',
  },
}));

export const GnbItem = styled(Button)(({ theme }) => ({
  backgroundColor: colors.gray_11,
  ...theme.typography.body2,
  padding: 0,
  textAlign: 'center',
  color: '#000',
  minWidth: 'auto',
  letterSpacing: '-0.32px',
  '& a': {
    color: '#999999',
    textDecoration: 'none',
  },
}));

export const StyledMenu = styled((props: MenuProps) => (
  <Menu elevation={0} {...props} />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 13,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    '& .MuiMenu-list': {
      padding: '8px',
    },
    '& .MuiMenuItem-root': {
      padding: '8px 5px',
      borderRadius: 3,
      ...theme.typography.body2,
    },
  },
}));

export const GnbATag = styled('a')(({ theme }) => ({
  backgroundColor: colors.gray_11,
  ...theme.typography.body2,
  padding: 0,
  textAlign: 'center',
  color: '#999999',
  textDecoration: 'none',
  minWidth: 'auto',
  letterSpacing: '-0.32px',
}));

export const GnbLink = (props: {
  children: string;
  href: string;
  style: CSSProperties | undefined;
  disabled?: boolean;
}) => {
  const router = useRouter();
  const { handleTokenInfo } = useContext(UserInfoContext);
  return (
    <Box
      sx={{
        '& .disabled-link': {
          pointerEvents: 'none',
        },
      }}
    >
      {router.pathname === props.href ? (
        <GnbATag style={props.style}>{props.children}</GnbATag>
      ) : (
        <Link
          href={props.disabled ? '/' : props.href}
          passHref
          className={props.disabled ? 'disabled-link' : ''}
        >
          <GnbATag style={props.style} onClick={handleTokenInfo}>
            {props.children}
          </GnbATag>
        </Link>
      )}
    </Box>
  );
};
