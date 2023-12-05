import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import { Stack, Typography } from '@mui/material';
import WPaymentsTextField from '@components/common/inputs/textField/modules/WPaymentsTextField';
import { useCallback, useEffect, useState } from 'react';
import { ErrorType } from '@components/common/inputs/type';
import WSubTitle from '@components/common/typography/WSubTitle';
import useMutateDispensingExpenses from '@hooks/apis/preparation/proceed/hooks/useMutateDispensingExpenses';
import { useDebounceFn } from 'ahooks';
import { commaAdd, commaRemove } from '@utils/formatNumber';

interface DispensingExpensesModalType extends ModalType {
  id: string;
  medicineCost: number;
}

interface Paymentsinfo {
  payment: string;
}
interface PaymentsinfoErr {
  payment: ErrorType;
}

const DispensingExpensesModal = (props: DispensingExpensesModalType) => {
  const { open, handleClose, id, medicineCost } = props;
  /**DispensingExpensesModal 버튼 활성호 상태*/
  const [disabled, setDisabled] = useState<boolean>(true);
  /**DispensingExpensesModal 입력 상태*/
  const [info, setInfo] = useState<Paymentsinfo>({
    payment: '0',
  });
  /**DispensingExpensesModal 입력 에러 상태*/
  const [infoErr, setInfoErr] = useState<PaymentsinfoErr>({
    payment: { msg: '', boo: false },
  });
  /**DispensingExpensesModal 모달 닫기 기능*/
  const onClickModalOff = useCallback(() => {
    setInfoErr({
      payment: { msg: '', boo: false },
    });
    setInfo({
      payment: '',
    });
    handleClose();
  }, [handleClose]);
  /**DispensingExpensesModal 조제비 수정 api 통신 */
  const { onClickDispensingExpenses } = useMutateDispensingExpenses({
    medicineCost: info.payment,
    medicineOrderUlid: id,
    modifyCoast: {
      onError: onClickModalOff,
      onSuccess: onClickModalOff,
    },
  });
  /**DispensingExpensesModal 조제비 수정 DebounceFn 기능*/
  const onClickCostDebounce = useDebounceFn(onClickDispensingExpenses, {
    wait: 300,
  });
  /**DispensingExpensesModal 조제비 수정 onKeyDown 기능*/
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        if (!disabled) {
          onClickCostDebounce.run();
        }
      }
    },
    [disabled, onClickCostDebounce],
  );
  /**DispensingExpensesModal 라이브 사이클 업데이트 -> info payment */
  useEffect(() => {
    setInfo({
      payment: medicineCost ? commaAdd(String(medicineCost)) + '원' : '0원',
    });
  }, [medicineCost]);

  /**DispensingExpensesModal 버튼 활성 상태 업데이트 기능 라이프 사이클*/
  useEffect(() => {
    if (String(medicineCost) !== commaRemove(info.payment)) {
      const reg = /\d+/;
      if (reg.test(info.payment)) {
        if (!infoErr.payment.boo) {
          setDisabled(false);
          return;
        }
        setDisabled(true);
        return;
      }
      setDisabled(true);
      return;
    }
    setDisabled(true);
  }, [info.payment, infoErr.payment.boo, medicineCost]);
  /**DispensingExpensesModal render*/
  return (
    <WConfirm
      activeOn
      open={open}
      title={'조제비 수정'}
      maxWidth="sm"
      titleSx={{ padding: '50px 0 8px' }}
      btnTitle={'수정'}
      handleClose={handleClose}
      disabled={disabled}
      handleEvent={onClickCostDebounce.run}
    >
      <Stack gap="40px" padding="0px 0 85px" width="430px">
        <Typography variant="body2" color="#666" fontWeight="400">
          {`조제비를 잘못 입력했을 경우 "조제 완료" 전까지 수정이 가능합니다. 변경된 조제비 입력 후 "수정" 버튼을 눌러주세요.`}
        </Typography>
        <Stack gap="14px">
          <WSubTitle title="조제비 입력" require />
          <WPaymentsTextField
            state={info.payment}
            setState={(text: string, keyId: string) => {
              setInfo((prev) => {
                return { ...prev, [keyId]: text };
              });
            }}
            keyId={'payment'}
            err={infoErr.payment}
            setErr={(err: ErrorType, keyId: string) => {
              setInfoErr((prev) => {
                return { ...prev, [keyId]: err };
              });
            }}
            onKeyDown={onKeyDown}
          />
        </Stack>
      </Stack>
    </WConfirm>
  );
};

export default DispensingExpensesModal;
