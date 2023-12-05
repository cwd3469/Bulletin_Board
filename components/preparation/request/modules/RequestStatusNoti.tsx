import WStatusNoti, {
  WNotiBox,
} from '@components/common/typography/WStatusNoti';
import { Box, Grid } from '@mui/material';

const RequestStatusNoti = (props: { totalElements: number }) => {
  return (
    <Grid container gap="16px" alignItems="center">
      <WStatusNoti
        counting={String(props.totalElements)}
        title="현재 조제 요청 건수"
        units="건"
      />
      <WNotiBox />
    </Grid>
  );
};

export default RequestStatusNoti;
