import { Box, Grid, SxProps, Theme, Typography } from '@mui/material';
import { FlexStartR } from '@styles/flexGrid';

const WMainTitle = (props: {
  title: string;
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
}) => {
  const { title, sx, titleSx } = props;
  return (
    <FlexStartR width="100%" sx={sx}>
      <Typography
        variant="h5"
        className={'mainTitle'}
        textAlign="right"
        sx={titleSx}
      >
        {title}
      </Typography>
    </FlexStartR>
  );
};

export default WMainTitle;
