import { Box, Grid, styled, SxProps, Theme, Typography } from '@mui/material';

export const WNotiTypography = styled(Typography)(({ theme }) => ({
  '&.title': {
    color: '#666',
    ...theme.typography.body2,
  },
  '&.counting': {
    color: '#4ac6ff',
    fontWeight: 'Bold',
    fontSize: '20px',
    lineHeight: '20px',
  },
  '&.units': {
    ...theme.typography.body1,
    color: '#000',
  },
}));
export const WNotiBox = styled(Box)(({ theme }) => ({
  width: '2px',
  height: '14px',
  backgroundColor: '#ddd',
}));

const WStatusNoti = (props: {
  title: string;
  counting: string;
  units: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Grid container width="auto" alignItems="center" gap="1px" sx={props.sx}>
      <WNotiTypography className="title">{props.title}</WNotiTypography>
      <Box width="12px" />
      <Grid container width="auto" alignItems="center" gap="3px">
        <WNotiTypography className="counting">{props.counting}</WNotiTypography>
        <WNotiTypography className="units">{props.units}</WNotiTypography>
      </Grid>
    </Grid>
  );
};

export default WStatusNoti;
