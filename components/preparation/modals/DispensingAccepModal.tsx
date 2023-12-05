import WTwoTab from '@components/common/button/radio/modules/WTwoTab';
import WPaymentsTextField from '@components/common/inputs/textField/modules/WPaymentsTextField';
import WRefusalDispenTextField from '@components/common/inputs/textField/modules/WRefusalDispenTextField';
import { ErrorType } from '@components/common/inputs/type';
import { ModalType } from '@components/common/layouts/gnb/types';
import WConfirm from '@components/common/modals/WConfirm';
import WSubTitle from '@components/common/typography/WSubTitle';
import { apiPrescriptionFileBase } from '@hooks/apis/preparation/request';
import useMutateDispensingAccept from '@hooks/apis/preparation/request/hooks/useMutateDispensingAccept';
import usePrescriptionPreview, {
  OneImagePreviewComponent,
} from '@hooks/utils/fileUpload/usePrescriptionPreview';
import { Box, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';

interface Paymentsinfo {
  payment: string;
  refusal: string;
}
interface PaymentsinfoErr {
  payment: ErrorType;
  refusal: ErrorType;
}

/**DispensingAccepModal props type */
interface DispensingAccepModalType extends ModalType {
  medicineOrderUlid: string;
  prescriptionUlid: string;
}

const DispensingAccepModal = (props: DispensingAccepModalType) => {
  const { open, handleClose, medicineOrderUlid, prescriptionUlid } = props;

  /**DispensingAccepModal 처방전 미리보기 기능 */
  const { fileArr, imageUrl, reset } = usePrescriptionPreview({
    medicineOrderUlid: medicineOrderUlid,
    prescriptionUlid: prescriptionUlid,
    handleClose: handleClose,
    apiFileBase: apiPrescriptionFileBase,
  });

  /**DispensingAccepModal 버튼 활성화 상태 */
  const [disabledAccept, setDisabledAccept] = useState<boolean>(true);

  /**DispensingAccepModal 버튼 활성화 상태 */
  const [disabledRefuse, setDisabledRefuse] = useState<boolean>(true);
  /**DispensingAccepModal 탭 상태 */
  const [tab, setTab] = useState<boolean>(true);
  /**DispensingAccepModal 입력값 상태 */
  const [info, setInfo] = useState<Paymentsinfo>({
    payment: '',
    refusal: '',
  });
  /**DispensingAccepModal 입력값 err 상태 */
  const [infoErr, setInfoErr] = useState<PaymentsinfoErr>({
    payment: { msg: '', boo: false },
    refusal: { msg: '', boo: false },
  });

  /**DispensingAccepModal 모달 닫기 기능 */
  const onClickReset = useCallback(() => {
    setInfo({
      payment: '',
      refusal: '',
    });
    setInfoErr({
      payment: { msg: '', boo: false },
      refusal: { msg: '', boo: false },
    });
    setTab(true);
    setDisabledAccept(true);
    setDisabledRefuse(true);
    handleClose();
    reset();
  }, [handleClose, reset]);

  /**DispensingAccepModal 수락 거절 api 요청 기능 */
  const { onClickDispensingAccept, onClickMutateDispensingRefuse } =
    useMutateDispensingAccept({
      dispensingExpenses: info.payment,
      refuseReason: info.refusal,
      medicineOrderUlid: medicineOrderUlid,
      onSuccess: onClickReset,
      onError: onClickReset,
    });

  /**DispensingAccepModal 입력 상태 변경 기능 */
  const onChangeState = useCallback((text: string, keyId: string) => {
    setInfo((prev) => {
      return { ...prev, [keyId]: text };
    });
  }, []);
  /**DispensingAccepModal 입력 Err 상태 변경 기능 */
  const onChangeStateErr = useCallback((err: ErrorType, keyId: string) => {
    setInfoErr((prev) => {
      return { ...prev, [keyId]: err };
    });
  }, []);
  /**DispensingAccepModal 조제 수락 비활성화 변경 기능 */
  const acceptInvigorator = useCallback(() => {
    if (info.payment === '') {
      setDisabledAccept(true);
      return;
    }
    if (info.payment === '원') {
      setDisabledAccept(true);
      return;
    }
    if (infoErr.payment.boo) {
      setDisabledAccept(true);
      return;
    }
    setDisabledAccept(false);
  }, [info.payment, infoErr.payment.boo]);

  /**DispensingAccepModal 조제 거절 비활성화 변경 기능 */
  const refusalInvigorator = useCallback(() => {
    if (info.refusal === '') {
      setDisabledRefuse(true);
      return;
    }
    if (infoErr.refusal.boo) {
      setDisabledRefuse(true);
      return;
    }
    setDisabledRefuse(false);
  }, [info.refusal, infoErr.refusal.boo]);

  /**DispensingAccepModal 조제 수락 비활성화 변경 기능 */
  const onTab = useCallback(() => {
    setTab(!tab);
  }, [tab]);

  useEffect(() => {
    if (tab) {
      acceptInvigorator();
    } else {
      refusalInvigorator();
    }
  }, [acceptInvigorator, refusalInvigorator, tab]);

  const handleEventAccept = useDebounceFn(onClickDispensingAccept, {
    wait: 300,
  });
  const handleEventRefuse = useDebounceFn(onClickMutateDispensingRefuse, {
    wait: 300,
  });

  /**DispensingAccepModal render */
  return (
    <WConfirm
      open={open}
      handleClose={onClickReset}
      handleEvent={tab ? handleEventAccept.run : handleEventRefuse.run}
      title="조제 수락 / 거절"
      maxWidth={tab ? 'xl' : 'sm'}
      titleSx={{ padding: '50px 0px 16px' }}
      btnTitle={tab ? '조제 수락' : '조제 거절'}
      disabled={tab ? disabledAccept : disabledRefuse}
      activeOn
    >
      <Stack gap="16px">
        <WTwoTab tab={tab} setTab={onTab} />
        {tab ? (
          <>
            {fileArr.length ? (
              <>
                <OneImagePreviewComponent
                  fileArr={fileArr}
                  imageUrl={imageUrl}
                />
                <Stack gap="14px" alignItems="center">
                  <Stack width="420px">
                    <WSubTitle title="조제비 입력" require />
                    <WPaymentsTextField
                      state={info.payment}
                      setState={onChangeState}
                      keyId={'payment'}
                      err={infoErr.payment}
                      setErr={onChangeStateErr}
                    />
                  </Stack>
                </Stack>
              </>
            ) : (
              <Stack height="500px"></Stack>
            )}
          </>
        ) : (
          <Stack gap="14px">
            <WSubTitle title="조제 거절 사유 입력" require />
            <WRefusalDispenTextField
              state={info.refusal}
              setState={onChangeState}
              keyId={'refusal'}
              err={infoErr.refusal}
              setErr={onChangeStateErr}
            />
          </Stack>
        )}

        <Box height="58px" />
      </Stack>
    </WConfirm>
  );
};

export default DispensingAccepModal;
