import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiDispensingExpenses, apiPrepared } from '..';
import { commaRemove } from '@utils/formatNumber';
import { useRouter } from 'next/router';
import { PROCEED_LIST } from '../queryKey';
import { DeliveryState } from '@components/preparation/modals/DeliveryRequestModal';

export type OnEvent = {
  onError?: () => void;
  onSuccess?: (ulid?: string, deliveryMethod?: DeliveryState) => void;
};

export interface UseDispensingExpensesType {
  medicineCost?: string;
  medicineOrderUlid: string;
  modifyCoast?: OnEvent;
  completeCoast?: OnEvent;
  quickPayment?: OnEvent;
}
const useMutateDispensingExpenses = (props: UseDispensingExpensesType) => {
  const {
    medicineCost,
    medicineOrderUlid,
    modifyCoast,
    completeCoast,
    quickPayment,
  } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const queryClient = useQueryClient();
  /**useMutateDispensingExpenses 조제비 수정  useMutation*/
  const { mutate: mutateDispensingExpenses } = useMutation(
    apiDispensingExpenses,
  );
  /**useMutateDispensingExpenses 조제 완료  useMutation*/
  const { mutate: mutationPrepared } = useMutation(apiPrepared);

  /**useMutateDispensingExpenses 조제비 수정  기능*/
  const onClickDispensingExpenses = useCallback(() => {
    if (medicineCost) {
      const dto = {
        medicineCost: commaRemove(medicineCost),
        medicineOrderUlid: medicineOrderUlid,
      };
      mutateDispensingExpenses(dto, {
        onSuccess: (res) => {
          const code = res.data.code;
          const data = res.data.data;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'info');
          } else {
            if (data) {
              toast?.on(`조제비 수정이 성공 하였습니다`, 'success');
            } else {
              toast?.on(
                `조제비 수정이 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
                'warning',
              );
            }
            if (modifyCoast && modifyCoast.onSuccess) {
              modifyCoast.onSuccess();
            }
            queryClient.invalidateQueries(PROCEED_LIST(router.query));

            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(
            `조제비 수정이 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
            'error',
          );
          if (modifyCoast && modifyCoast.onError) {
            modifyCoast.onError();
          }
        },
      });
    }
  }, [
    medicineCost,
    medicineOrderUlid,
    mutateDispensingExpenses,
    toast,
    msg,
    modifyCoast,
    queryClient,
    router.query,
  ]);
  /**useMutateDispensingExpenses 조제 완료 기능*/
  const onClickPreparationComplete = useCallback(() => {
    if (medicineOrderUlid) {
      const dto = {
        medicineOrderUlid: medicineOrderUlid,
      };
      mutationPrepared(dto, {
        onSuccess: (res) => {
          const code = res.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'info');
            if (completeCoast && completeCoast.onError) {
              completeCoast.onError();
            }
          } else {
            if (completeCoast && completeCoast.onSuccess) {
              completeCoast.onSuccess();
            }
            queryClient.invalidateQueries(PROCEED_LIST(router.query));
            return;
          }
        },
        onError: (errMsg) => {
          if (completeCoast && completeCoast.onError) {
            completeCoast.onError();
          }
          toast?.on(
            `조제 완료가 실패하였습니다 \n잠시 후, 다시 시도해 주세요`,
            'error',
          );
        },
      });
    }
  }, [
    completeCoast,
    medicineOrderUlid,
    msg,
    mutationPrepared,
    queryClient,
    router.query,
    toast,
  ]);

  return {
    onClickDispensingExpenses,
    onClickPreparationComplete,
  };
};

export default useMutateDispensingExpenses;
