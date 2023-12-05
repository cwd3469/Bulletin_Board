import React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import WDatePickerFilter from '@components/common/inputs/datepicker/modules/WDatePickerFilter';
import { RequestFilterContext } from '@hooks/contexts/filters/RequestFilterContext';

const RequestFilter = () => {
  const { filter, date, setInFilter, setInDate } =
    React.useContext(RequestFilterContext);

  const searchEvent = (txt: string) => {
    setInFilter(txt, 'keyword');
  };

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container width="auto" gap={'10px'}>
        <WDatePickerFilter date={date} setInDate={setInDate} />
        <WSearchInput
          queryValue={filter.keyword}
          search={searchEvent}
          placeholder="요청자 이름 , 휴대폰 번호 검색"
        />
      </Grid>
    </Grid>
  );
};

export default RequestFilter;
