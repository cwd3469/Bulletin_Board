import { Box, Grid, styled, TextField } from '@mui/material';
import {
  DateRange,
  DateRangePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

export const FilterTextField = styled(TextField)(({ theme }) => ({
  background: '#fff',
  ...theme.typography.body1,
  border: '0px',
  width: '90px',
  padding: '',
  '& .MuiInputBase-input': {
    padding: '10px 5px 10px',
    color: '#666666',
    border: '0px',
  },
  '& .Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff !important',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '0px',
  },
}));

const WDatePicker = (props: {
  date: DateRange<Dayjs>;
  selectDate: (
    date: DateRange<Dayjs>,
    keyboardInputValue?: string | undefined,
  ) => void;
}) => {
  const { date, selectDate } = props;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: '', end: '' }}
    >
      <DateRangePicker
        value={date}
        onChange={selectDate}
        inputFormat="YYYY/MM/DD"
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <Grid
              container
              justifyContent={'center'}
              alignItems={'center'}
              sx={{
                overflow: 'hidden',
                height: '40px',
                width: '245px',
                border: '1px solid #e0e1e2',
                backgroundColor: '#fff',
                borderRadius: '6px',
              }}
            >
              <FilterTextField {...startProps} label="" />
              <p style={{ color: '#666' }}>-</p>
              <Box width="5px" />
              <FilterTextField {...endProps} label="" />
            </Grid>
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
};

export default WDatePicker;
