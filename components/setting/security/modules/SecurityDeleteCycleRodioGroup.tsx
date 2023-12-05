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

const SecurityDeleteCycleRodioGroup = (props: SecurityRodioGroupType) => {
  const { onChangeValue, value } = props;
  const dateList: GroupRadioListType[] = [
    {
      data: '30',
      name: '30일',
    },
    {
      data: '60',
      name: '60일',
    },
    {
      data: '90',
      name: '90일',
    },
    {
      data: '100',
      name: '100일',
    },
    {
      data: '365',
      name: '365일',
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const select = (event.target as HTMLInputElement).value;
    onChangeValue(select);
  };
  return (
    <FlexStartC gap="16px">
      <WSubTitle title={'어디아파 개인정보 삭제 주기 설정 안내'} />
      <Typography variant="body2" color="#404040" width="540px">
        회원님의 개인정보를 위하여 관련 법령에 따라 개인정보 삭제를 진행할
        예정입니다. 개인정보 삭제 주기 설정에 따라 진행합니다.
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

export default SecurityDeleteCycleRodioGroup;
