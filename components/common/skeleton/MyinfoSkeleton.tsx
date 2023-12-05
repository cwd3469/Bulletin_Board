import { Box, Grid, Stack } from '@mui/material';
import { FooterSkeleton, InputSkeleton } from './modules/moduleSkeleton';

const MyinfoSkeleton = () => {
  return (
    <Grid width="auto" container gap="20px">
      <Stack gap="20px" width="40%">
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
      </Stack>
      <Stack gap="20px" width="40%">
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
      </Stack>
      <Box paddingTop="60px" width="100%" />
      <FooterSkeleton />
    </Grid>
  );
};

export default MyinfoSkeleton;
