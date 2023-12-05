import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  RadioProps,
  styled,
  SxProps,
  Theme,
} from '@mui/material';

interface WTwoTabType {
  tab: boolean;
  setTab: (boo: boolean) => void;
  sx?: SxProps<Theme>;
  labelName?: {
    first: string;
    second: string;
  };
}
export const WTwoTabGrid = styled(Grid)(({ theme }) => ({
  '& .MuiTypography-root': {
    color: '#666',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
}));

const WTwoTab = (props: WTwoTabType) => {
  const { tab, setTab, labelName, sx } = props;
  return (
    <WTwoTabGrid container justifyContent={'center'} sx={sx}>
      <RadioGroup row name="row-radio-buttons-group">
        <FormControlLabel
          value="female"
          control={<Radio />}
          label={labelName ? labelName.first : '조제 수락'}
          checked={tab}
          onChange={() => setTab(true)}
        />
        <FormControlLabel
          value="male"
          control={<Radio />}
          label={labelName ? labelName.second : '조제 거절'}
          checked={!tab}
          onChange={() => setTab(false)}
        />
      </RadioGroup>
    </WTwoTabGrid>
  );
};
export default WTwoTab;
