import { Box, Grid, SxProps, Theme, Typography } from '@mui/material';

const WSubTitle = (props: {
  title: string;
  subTitle?: string;
  require?: boolean;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <Grid
      className={props.className}
      container
      alignItems={'center'}
      gap="2px"
      sx={{ cursor: props.onClick ? 'pointer' : 'default', ...props.sx }}
      onClick={props.onClick}
    >
      <Typography variant="subtitle1" className={'wSubTitle-title'}>
        {props.title}
      </Typography>
      {props.require ? (
        <Typography
          variant="body2"
          color="#4ac6ff"
          className={'wSubTitle-require'}
        >
          (필수)
        </Typography>
      ) : (
        ''
      )}
      {props.subTitle ? (
        <>
          <Box width="10px" />
          <Typography
            variant="body1"
            color="#4E4E4E"
            className={'wSubTitle-subTitle'}
          >
            {props.subTitle}
          </Typography>
        </>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default WSubTitle;
