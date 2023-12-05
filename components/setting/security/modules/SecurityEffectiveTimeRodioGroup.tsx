import GroupRadio, {
  GroupRadioListType,
} from '@components/common/button/radio/modules/GroupRadio';
import WSubTitle from '@components/common/typography/WSubTitle';
import { FormControl, RadioGroup, Typography } from '@mui/material';
import { FlexStartC } from '@styles/flexGrid';

export interface SecurityRodioGroupType {
  onChangeValue: (value: string) => void;
  value: string;
}

const SecurityEffectiveTimeRodioGroup = (props: SecurityRodioGroupType) => {
  const { onChangeValue, value } = props;
  const dateList: GroupRadioListType[] = [
    {
      data: '10',
      name: '10분',
    },
    {
      data: '30',
      name: '30분',
    },
    {
      data: '60',
      name: '60분',
    },
    {
      data: '0',
      name: '사용하지 않음',
      notRecommended: true,
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const select = (event.target as HTMLInputElement).value;
    onChangeValue(select);
  };
  return (
    <FlexStartC gap="16px">
      <WSubTitle title={'유효시간 설정'} />
      <Typography variant="body2" color="#404040" width="350px">
        회원님의 개인정보 보호를 위하여 사용 디바이스의 로그인 시간을 설정할 수
        있습니다.
      </Typography>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="security-set-radio-buttons-group"
          name="security-set-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          {dateList.map((item, index) => {
            return <GroupRadio key={index} data={item} value={value} />;
          })}
        </RadioGroup>
      </FormControl>
    </FlexStartC>
  );
};

export default SecurityEffectiveTimeRodioGroup;
