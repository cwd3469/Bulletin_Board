import { useCallback, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { WeekendDto } from '../type';
import BusinessTimePicker from '@components/common/inputs/timepicker/modules/BusinessTimePicker';
import WSwitch from '@components/common/inputs/WSwitch';
import dayjs from 'dayjs';

interface WeekFormType {
  week: string;
  name: string;
  open: boolean;
  openTime: string;
  closeTime: string;
  setWeekOnChange: (value: WeekendDto, keyId: string) => void;
}

const BusinessWeekForm = (props: WeekFormType) => {
  const { week, name, open, setWeekOnChange, openTime, closeTime } = props;
  const [startState, setStart] = useState<string>(openTime);
  const [endState, setEnd] = useState<string>(closeTime);
  const [hospitalOpen, setHospitalOpen] = useState<boolean>(open);

  const info = {
    fullWidth: '128px',
    switchheight: '39px',
    switchWidth: '65px',
    switchOn: '"ON"',
    switchOff: '"OFF"',
    moveTranslateX: 'translateX(63px)',
    borderRadius: '6px',
  };

  const setStartime = useCallback(
    (time: string) => {
      setStart(time);
      const startDate = time;
      const endDate = endState;
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: hospitalOpen,
      };
      setWeekOnChange(res, week);
    },
    [endState, hospitalOpen, setWeekOnChange, week],
  );

  const setEndTime = useCallback(
    (time: string) => {
      setEnd(time);
      const startDate = startState;
      const endDate = time;
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: hospitalOpen,
      };
      setWeekOnChange(res, week);
    },
    [hospitalOpen, setWeekOnChange, startState, week],
  );

  const setOpenSwich = useCallback(
    (boo: boolean) => {
      setHospitalOpen(boo);
      const startDate = startState;
      const endDate = endState;
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: boo,
      };
      setWeekOnChange(res, week);
    },
    [endState, setWeekOnChange, startState, week],
  );

  return (
    <Grid container alignItems={'center'} gap="8px" justifyContent={'start'}>
      <Typography
        variant="body2"
        fontWeight="600"
        color={
          week === 'sundayOperation' || week === 'holidayOperation'
            ? '#f11919'
            : '#333'
        }
        paddingRight="6px"
      >
        {name}
      </Typography>
      <BusinessTimePicker
        startTime={setStartime}
        endTime={setEndTime}
        startState={startState}
        endState={endState}
        active={hospitalOpen}
        disabled={!hospitalOpen}
      />
      <WSwitch
        checked={hospitalOpen}
        info={info}
        onChange={() => {
          setOpenSwich(!hospitalOpen);
        }}
      />
    </Grid>
  );
};

export default BusinessWeekForm;
