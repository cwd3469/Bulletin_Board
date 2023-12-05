import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Stack, Typography } from '@mui/material';

export interface GroupRadioListType {
  data: string;
  name: string;
  notRecommended?: boolean;
}

export interface GroupRadioType {
  data: GroupRadioListType;
  value: string;
}

const GroupRadio = (props: GroupRadioType) => {
  const { data, value } = props;

  return (
    <Stack
      sx={{
        position: 'relative',
      }}
    >
      {data.notRecommended ? (
        <Typography
          variant="caption"
          color="#ff3a46"
          fontWeight="bold"
          letterSpacing={'-1px'}
          sx={{
            position: 'absolute',
            left: '0px',
            top: '-12px',
            width: '200px',
          }}
        >
          개인정보 보호를 위해 권장하지 않습니다.
        </Typography>
      ) : (
        ''
      )}
      <FormControlLabel
        value={data.data}
        control={<Radio />}
        label={data.name}
        sx={{
          '& .MuiButtonBase-root': {
            color: '#999999',
            '&.Mui-checked': {
              color: '#4ac6ff',
            },
          },
          '& .MuiTypography-root': {
            color: value === data.data ? '#4ac6ff' : '#999999',
          },
        }}
      />
    </Stack>
  );
};

export default GroupRadio;
