import { Grid, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import { dateFormat } from '@utils/date';

const WDayTimeTypography = (props: { sx?: SxProps<Theme>; date: string }) => {
  const { day, time } = dateFormat(props.date);
  return (
    <Grid container justifyContent={'center'} gap="3px" sx={props.sx}>
      <Typography
        variant="overline"
        fontWeight={'700'}
        fontSize={'0.875rem'}
        letterSpacing="-0.14px !important"
      >
        {day}
      </Typography>
      <Typography
        variant="overline"
        color="#666"
        fontWeight={'400'}
        fontSize={'0.875rem'}
        letterSpacing="-0.14px !important"
      >
        {time}
      </Typography>
    </Grid>
  );
};

export default WDayTimeTypography;
