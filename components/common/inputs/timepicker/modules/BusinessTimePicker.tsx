import { Grid, styled, Box, Typography } from '@mui/material';
import WSelecOpenTimeList from '../../select/modules/WSelecOpenTimeList';

export const TimeBox = styled(Grid)((GridTypeMap) => ({
  border: '1px solid #ddd',
  width: '160px',
  borderRadius: '6px',
  padding: '0',
  height: '36px',
  alignItems: 'center',
}));

interface TimepickerType {
  startTime: (time: string) => void;
  endTime: (time: string) => void;
  active: boolean;
  startState: string;
  endState: string;
  disabled?: boolean;
}

const BusinessTimePicker = (props: TimepickerType) => {
  const { startTime, endTime, startState, endState, active, disabled } = props;

  return (
    <>
      <TimeBox
        container
        sx={{
          borderColor: active ? '#4ac6ff' : '#ddd',
          backgroundColor: disabled ? '#ebeced' : '#fff',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '45%' }}>
          <WSelecOpenTimeList
            name="ssn-1"
            disabled={disabled}
            value={JSON.stringify(startState)}
            callBack={(id: string) => {
              const date = JSON.parse(id);
              startTime(date);
            }}
          />
        </Box>
        <Typography color="#999">~</Typography>
        <Box sx={{ width: '45%' }}>
          <WSelecOpenTimeList
            name="ssn-2"
            disabled={disabled}
            value={JSON.stringify(endState)}
            callBack={(id: string) => {
              const date = JSON.parse(id);
              endTime(date);
            }}
          />
        </Box>
      </TimeBox>
    </>
  );
};

export default BusinessTimePicker;
