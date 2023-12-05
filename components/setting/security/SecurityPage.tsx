import { WButton } from '@components/common/button/WButton';
import { WBoxLayout } from '@components/common/layouts/WLayout';
import WSubTitle from '@components/common/typography/WSubTitle';
import { Box, Typography } from '@mui/material';
import {
  FlexCenterC,
  FlexCenterR,
  FlexStartC,
  FlexStartR,
} from '@styles/flexGrid';

import { useCallback, useEffect, useState } from 'react';
import SecurityDeleteCycleRodioGroup from './modules/SecurityDeleteCycleRodioGroup';
import SecurityEffectiveTimeRodioGroup from './modules/SecurityEffectiveTimeRodioGroup';
import {
  useSecurityAuth,
  useSecurityAuthUpdate,
} from '@hooks/apis/auth/security/useSecurityAuth';
import LoadingErrorFallback from '@components/common/api/LoadingErrorFallback';

export interface SecurityDto {
  accessTokenExpireTime: number;
  privacyRetentionPeriod: number;
}

const SecurityPage = () => {
  const { data, isError, isLoading, isWarning } = useSecurityAuth();

  return (
    <LoadingErrorFallback
      data={data}
      isError={isError}
      isLoading={isLoading}
      isWarning={isWarning}
      contexts={(info) => {
        const data = info.data.data;
        return <SecurityPageTemplate dto={data} />;
      }}
    ></LoadingErrorFallback>
  );
};

const SecurityPageTemplate = (props: { dto: SecurityDto }) => {
  const { dto } = props;
  const [validTime, setValidTime] = useState<string>(
    String(dto.accessTokenExpireTime),
  );
  const [validPeriod, setValidPeriod] = useState<string>(
    String(dto.privacyRetentionPeriod),
  );
  const { securityUpdate } = useSecurityAuthUpdate();

  const onChengeTime = useCallback((value: string) => {
    setValidTime(value);
  }, []);
  const onChengePeriod = useCallback((value: string) => {
    setValidPeriod(value);
  }, []);

  const onClickFix = useCallback(() => {
    securityUpdate({
      accessTokenExpireTime: Number(validTime),
      privacyRetentionPeriod: Number(validPeriod),
    });
  }, [securityUpdate, validPeriod, validTime]);

  const onDisabled =
    JSON.stringify(dto) ===
    JSON.stringify({
      accessTokenExpireTime: Number(validTime),
      privacyRetentionPeriod: Number(validPeriod),
    });

  return (
    <FlexCenterC gap="26px">
      <WBoxLayout padding="38px" width="100%">
        <FlexStartC gap="16px">
          <WSubTitle title={'개인정보 처리 설정'}></WSubTitle>
        </FlexStartC>
        <Box height="40px" />
        <FlexStartR gap="200px">
          <SecurityEffectiveTimeRodioGroup
            onChangeValue={onChengeTime}
            value={validTime}
          />
          <SecurityDeleteCycleRodioGroup
            onChangeValue={onChengePeriod}
            value={validPeriod}
          />
        </FlexStartR>
      </WBoxLayout>
      <WButton
        disabled={onDisabled}
        onClick={onClickFix}
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

export default SecurityPage;
