import { Box, Grid, Pagination, PaginationItem, SvgIcon } from '@mui/material';

const ChevronDoubleLeft = () => (
  <SvgIcon sx={{ marginBottom: '5px' }}>
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8333 22.1667L4.66666 14L12.8333 5.83333M22.1667 22.1667L14 14L22.1667 5.83333"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SvgIcon>
);

const ChevronLeft = () => (
  <SvgIcon sx={{ marginBottom: '5px' }}>
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 22.1667L9.33334 14L17.5 5.83333"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SvgIcon>
);

const ChevronRight = () => (
  <SvgIcon sx={{ marginBottom: '5px' }}>
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 5.83333L18.6667 14L10.5 22.1667"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SvgIcon>
);
const ChevronDoubleRight = () => (
  <SvgIcon sx={{ marginBottom: '5px' }}>
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.1667 5.83333L23.3333 14L15.1667 22.1667M5.83333 5.83333L14 14L5.83333 22.1667"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SvgIcon>
);

const WPagination = (props: {
  pagination: (event: React.ChangeEvent<unknown>, value: number) => void;
  page: number;
  count: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fontSize?: string;
  minWidth?: string;
  paddingTop?: string;
}) => {
  const {
    pagination,
    page,
    count,
    size,
    color,
    fontSize,
    minWidth,
    paddingTop,
  } = props;
  return (
    <Grid container justifyContent="center" width="100%">
      <Box
        minWidth={minWidth ? minWidth : '440px'}
        paddingTop={paddingTop ? paddingTop : '0px'}
      >
        <Pagination
          count={count}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
          size={size ? size : 'medium'}
          page={page}
          sx={{
            '& .MuiPagination-ul': {
              justifyContent: 'center',
            },
            '& .MuiButtonBase-root': {
              color: color ? color : '#333',
              fontSize: fontSize ? fontSize : '16px',
            },
            '& .MuiSvgIcon-root': {
              color: color ? color : '#333',
              fontSize: fontSize ? fontSize : '18px',
            },
          }}
          onChange={pagination}
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ChevronLeft,
                first: ChevronDoubleLeft,
                next: ChevronRight,
                last: ChevronDoubleRight,
              }}
              {...item}
            />
          )}
        />
      </Box>
    </Grid>
  );
};

export default WPagination;
