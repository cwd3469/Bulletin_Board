import { WButton } from '@components/common/button/WButton';
import { WBoxLayout } from '@components/common/layouts/WLayout';
import { Box, Grid, Typography } from '@mui/material';
import { FlexCenterC, FlexStartC, FlexStartR } from '@styles/flexGrid';
import { WeekendDto, WeekDataBundle } from './type';
import BusinessWeekForm from './modules/BusinessWeekForm';
import { useEffect, useState } from 'react';
import useBusinesssSet from '@hooks/apis/setting/biseness/useBusinesssSet';
import { forinArr } from '@utils/file';
import { stringToDate } from '@utils/date';
import WSubTitle from '@components/common/typography/WSubTitle';
import useMutationPharmacyProflie from '@hooks/apis/setting/biseness/useMutationPharmacyProflie';
import { useDebounceFn } from 'ahooks';
import Image from 'next/image';
import banner from 'public/assets/images/banner.jpg';
import WMobileTextField from '@components/common/inputs/textField/modules/WMobileTextField';
import { ErrorType } from '@components/common/inputs/type';
import { mobileFormat, mobileFormatOff } from '@utils/formatNumber';

const BusinessHourPageTitle = (props: { title: string; contents: string }) => {
  return (
    <FlexStartC gap="8px">
      <WSubTitle title={props.title} />
      <Typography
        variant="body2"
        fontWeight="400"
        lineHeight="22px"
        color="#848484"
      >
        {props.contents}
      </Typography>
    </FlexStartC>
  );
};

export interface PharmacistMobileNum {
  pharmacistMobileNum1: string;
  pharmacistMobileNum2: string;
  pharmacistMobileNum3: string;
}
interface PharmacistMobileNumError {
  pharmacistMobileNum1: ErrorType;
  pharmacistMobileNum2: ErrorType;
  pharmacistMobileNum3: ErrorType;
}

const BusinessHourPage = () => {
  const { businessData, weeks } = useBusinesssSet();
  // 수정 버튼 상태
  const [disabled, setDisabled] = useState<boolean>(true);
  // 영업시간 상태
  const [pharmacyUlid, setPharmacyUlid] = useState<string>('');
  const [weekList, setWeekList] = useState<WeekDataBundle | undefined>();
  const [startWeek, setStartWeek] = useState<WeekendDto[]>([]);
  const [endWeek, setEndWeek] = useState<WeekendDto[]>([]);
  // 알림토 발송 대상
  const [mobiles, setMobiles] = useState<PharmacistMobileNum>({
    pharmacistMobileNum1: '',
    pharmacistMobileNum2: '',
    pharmacistMobileNum3: '',
  });
  const [mobilesError, setMobilesError] = useState<PharmacistMobileNumError>({
    pharmacistMobileNum1: { msg: '', boo: false },
    pharmacistMobileNum2: { msg: '', boo: false },
    pharmacistMobileNum3: { msg: '', boo: false },
  });
  const dto = {
    pharmacistMobileNum1: mobileFormatOff(mobiles.pharmacistMobileNum1),
    pharmacistMobileNum2: mobileFormatOff(mobiles.pharmacistMobileNum2),
    pharmacistMobileNum3: mobileFormatOff(mobiles.pharmacistMobileNum3),
  };
  const { onClickPharmacyProflieModify } = useMutationPharmacyProflie({
    weekList,
    pharmacyUlid,
    mobiles: dto,
  });
  const onClickPharmacyProflieModifynDebounce = useDebounceFn(
    onClickPharmacyProflieModify,
    {
      wait: 300,
    },
  );
  const onChangeMobiles = (value: string, keyId: string) => {
    setMobiles((prec) => {
      return { ...prec, [keyId]: value };
    });
  };
  const onChangeMobilesError = (value: ErrorType, keyId: string) => {
    setMobilesError((prec) => {
      return { ...prec, [keyId]: value };
    });
  };

  const onChangeWeekList = (value: WeekendDto, keyId: string) => {
    setWeekList((prec) => {
      if (prec) return { ...prec, [keyId]: value };
    });
  };

  useEffect(() => {
    if (businessData) {
      if (businessData.pharmacyUlid) {
        setPharmacyUlid(businessData.pharmacyUlid);
      }

      const data: WeekDataBundle = {
        mondayOperation: businessData.mondayOperation,
        tuesdayOperation: businessData.tuesdayOperation,
        wednesdayOperation: businessData.wednesdayOperation,
        thursdayOperation: businessData.thursdayOperation,
        fridayOperation: businessData.fridayOperation,
        saturdayOperation: businessData.saturdayOperation,
        sundayOperation: businessData.sundayOperation,
        holidayOperation: businessData.holidayOperation,
      };

      const mobile = {
        pharmacistMobileNum1: mobileFormat(businessData.pharmacistMobileNum1),
        pharmacistMobileNum2: mobileFormat(businessData.pharmacistMobileNum2),
        pharmacistMobileNum3: mobileFormat(businessData.pharmacistMobileNum3),
      };

      const arr: WeekendDto[] = forinArr(data);
      const start: WeekendDto[] = arr.filter((item, index) => index <= 3);
      const end: WeekendDto[] = arr.filter((item, index) => index > 3);

      setMobiles(mobile);
      setStartWeek(start);
      setEndWeek(end);
      setWeekList(data);
    }
  }, [businessData]);

  useEffect(() => {
    if (mobiles.pharmacistMobileNum1 && mobilesError.pharmacistMobileNum1.boo) {
      setDisabled(true);
      return;
    }
    if (mobiles.pharmacistMobileNum2 && mobilesError.pharmacistMobileNum2.boo) {
      setDisabled(true);
      return;
    }
    if (mobiles.pharmacistMobileNum3 && mobilesError.pharmacistMobileNum3.boo) {
      setDisabled(true);
      return;
    }
    if (businessData && weekList) {
      const businessDataMobile = {
        pharmacistMobileNum1: mobileFormat(businessData.pharmacistMobileNum1),
        pharmacistMobileNum2: mobileFormat(businessData.pharmacistMobileNum2),
        pharmacistMobileNum3: mobileFormat(businessData.pharmacistMobileNum3),
      };
      if (
        JSON.stringify(businessData.mondayOperation) !==
        JSON.stringify(weekList.mondayOperation)
      ) {
        setDisabled(false);
        return;
      }
      if (
        JSON.stringify(businessData.tuesdayOperation) !==
        JSON.stringify(weekList.tuesdayOperation)
      ) {
        setDisabled(false);
        return;
      }
      if (
        JSON.stringify(businessData.wednesdayOperation) !==
        JSON.stringify(weekList.wednesdayOperation)
      ) {
        setDisabled(false);
        return;
      }
      if (
        JSON.stringify(businessData.thursdayOperation) !==
        JSON.stringify(weekList.thursdayOperation)
      ) {
        setDisabled(false);
        return;
      }
      if (
        JSON.stringify(businessData.fridayOperation) !==
        JSON.stringify(weekList.fridayOperation)
      ) {
        setDisabled(false);
        return;
      }
      if (
        JSON.stringify(businessData.saturdayOperation) !==
        JSON.stringify(weekList.saturdayOperation)
      ) {
        setDisabled(false);
        return;
      }
      if (
        JSON.stringify(businessData.sundayOperation) !==
        JSON.stringify(weekList.sundayOperation)
      ) {
        setDisabled(false);
        return;
      }
      if (
        JSON.stringify(businessData.holidayOperation) !==
        JSON.stringify(weekList.holidayOperation)
      ) {
        setDisabled(false);
        return;
      }
      if (JSON.stringify(mobiles) !== JSON.stringify(businessDataMobile)) {
        setDisabled(false);
        return;
      }

      setDisabled(true);
    } else {
      setDisabled(true);
    }
  }, [
    businessData,
    mobiles,
    mobilesError.pharmacistMobileNum1.boo,
    mobilesError.pharmacistMobileNum2.boo,
    mobilesError.pharmacistMobileNum3.boo,
    weekList,
  ]);

  return (
    <FlexCenterC gap="26px">
      <Grid container justifyContent="space-between">
        {' '}
        <WBoxLayout padding="40px" width="830px">
          {weekList ? (
            <>
              <BusinessHourPageTitle
                title="요일별 영업 시간 유무 설정"
                contents="해당 의 영업 시작 시간을 설정해 주세요."
              />
              <Box height="24px" />
              <FlexStartR gap="40px">
                <FlexStartC gap="32px">
                  {startWeek
                    ? startWeek.map((item, index) => {
                        const week = weeks[index];
                        return (
                          <BusinessWeekForm
                            key={index}
                            week={week.en}
                            name={week.ko}
                            open={item.hasOperation}
                            openTime={item.openTime}
                            closeTime={item.closeTime}
                            setWeekOnChange={onChangeWeekList}
                          />
                        );
                      })
                    : ''}
                </FlexStartC>
                <FlexStartC gap="32px">
                  {endWeek
                    ? endWeek.map((item, index) => {
                        const week = weeks[index + 4];
                        return (
                          <BusinessWeekForm
                            key={index}
                            week={week.en}
                            name={week.ko}
                            open={item.hasOperation}
                            openTime={item.openTime}
                            closeTime={item.closeTime}
                            setWeekOnChange={onChangeWeekList}
                          />
                        );
                      })
                    : ''}
                </FlexStartC>
              </FlexStartR>
            </>
          ) : (
            ''
          )}
          <Box height="40px" />
          <Image src={banner} alt="배너" width={750} height={235} />
        </WBoxLayout>
        <WBoxLayout padding="38px" width="346px">
          <BusinessHourPageTitle
            title="알림 톡 발송 대상 휴대폰 번호"
            contents="조제 건 발생 시 알림 톡으로 알려드려요."
          />
          <Box height="24px" />
          <WMobileTextField
            state={mobiles.pharmacistMobileNum1}
            err={mobilesError.pharmacistMobileNum1}
            setState={onChangeMobiles}
            setErr={onChangeMobilesError}
            keyId={'pharmacistMobileNum1'}
          />
          <WMobileTextField
            state={mobiles.pharmacistMobileNum2}
            err={mobilesError.pharmacistMobileNum2}
            setState={onChangeMobiles}
            setErr={onChangeMobilesError}
            keyId={'pharmacistMobileNum2'}
          />
          <WMobileTextField
            state={mobiles.pharmacistMobileNum3}
            err={mobilesError.pharmacistMobileNum3}
            setState={onChangeMobiles}
            setErr={onChangeMobilesError}
            keyId={'pharmacistMobileNum3'}
          />
        </WBoxLayout>
      </Grid>
      <WButton
        disabled={disabled}
        onClick={onClickPharmacyProflieModifynDebounce.run}
        variant="contained"
        sx={{
          width: '320px',
        }}
      >
        수정
      </WButton>
    </FlexCenterC>
  );
};

export default BusinessHourPage;
