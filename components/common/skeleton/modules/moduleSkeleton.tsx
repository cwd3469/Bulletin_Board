import { Skeleton, Stack } from '@mui/material';

const InputSkeleton = () => {
  return (
    <Stack gap="16px" width="auto">
      <Skeleton variant="rounded" width={210} height={30} animation="wave" />
      <Skeleton variant="rounded" width={410} height={50} animation="wave" />
    </Stack>
  );
};

const FooterSkeleton = () => {
  return (
    <Stack gap="16px">
      <Skeleton variant="rounded" width={600} height={40} animation="wave" />
      <Skeleton
        variant="rounded"
        width={'900px'}
        height={150}
        animation="wave"
      />
    </Stack>
  );
};

export { FooterSkeleton, InputSkeleton };
