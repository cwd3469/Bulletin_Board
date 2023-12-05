import React, { useState, useEffect } from 'react';
import useTimer, { TimerResendInterface } from '@hooks/utils/useTimer';
import { Grid, Typography } from '@mui/material';
import { TimerButton } from '../signup/styled';

export default function AuthTimer(props: TimerResendInterface) {
  const { resend, showTime, isReStart } = props;
  const { timer, minutes, seconds, reStart } = useTimer({
    action: props.action,
    time: props.time,
  });

  const [showBtn, setShowBtn] = useState<boolean>(false);
  const lastMinutes = showTime ? showTime.minutes : 0;
  const lastSeconds = showTime ? showTime.seconds : 30;

  useEffect(() => {
    if (minutes <= lastMinutes) {
      if (seconds <= lastSeconds) {
        setShowBtn(true);
      }
    } else {
      setShowBtn(false);
    }
  }, [lastMinutes, lastSeconds, minutes, seconds]);

  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems="center"
      gap="8px"
      width="auto"
    >
      {showBtn ? (
        <TimerButton
          onClick={() => {
            resend();
            if (isReStart) {
              reStart();
            }
          }}
        >
          재발송
        </TimerButton>
      ) : (
        ''
      )}

      <Typography variant="body2" fontWeight={'bold'} color="#4ac6ff">
        {timer}
      </Typography>
    </Grid>
  );
}
