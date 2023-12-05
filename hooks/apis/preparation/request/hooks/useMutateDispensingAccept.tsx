import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiDispensingAccept, apiDispensingRefuse } from '..';
import { REQUEST_LIST } from '../queryKey';
import { useRouter } from 'next/router';
import { commaRemove } from '@utils/formatNumber';

/** useMutateDispensingAccept props type */
interface UseDispensingExpensesType {
  dispensingExpenses: string;
  refuseReason: string;
  medicineOrderUlid: string;
  onSuccess: () => void;
  onError: () => void;
}
const useMutateDispensingAccept = (props: UseDispensingExpensesType) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: mutateDispensingAccept } = useMutation(apiDispensingAccept);
  const { mutate: mutateDispensingRefuse } = useMutation(apiDispensingRefuse);

  /** useMutateDispensingAccept 조제 수락 API hook*/
  const onClickDispensingAccept = useCallback(() => {
    if (props.dispensingExpenses) {
      mutateDispensingAccept(
        {
          msg: props.dispensingExpenses,
          medicineOrderUlid: props.medicineOrderUlid,
        },
        {
          onSuccess: (res) => {
            const code = res.data.code;
            const data = res.data.data;
            if (code !== '0000') {
              toast?.on(msg.errMsg(code), 'warning');
            } else {
              if (data) {
                toast?.on(`조제비 입력을 완료하였습니다.`, 'success');
              } else {
                toast?.on(`조제비 입력이 실패하였습니다.`, 'warning');
              }
              props.onSuccess();
              queryClient.invalidateQueries(REQUEST_LIST(router.query));
              return;
            }
          },
          onError: (errMsg) => {
            toast?.on(
              `조제비 입력에 실패하였습니다.\n 잠시 후, 다시 시도해 주세요.`,
              'error',
            );
            props.onError();
          },
        },
      );
    }
  }, [msg, mutateDispensingAccept, props, queryClient, router.query, toast]);

  /** useMutateDispensingAccept 조제 거절 API hook*/
  const onClickMutateDispensingRefuse = useCallback(() => {
    if (props.refuseReason && props.medicineOrderUlid) {
      mutateDispensingRefuse(
        { msg: props.refuseReason, medicineOrderUlid: props.medicineOrderUlid },
        {
          onSuccess: (res) => {
            const code = res.data.code;
            const data = res.data.data;
            if (code !== '0000') {
              toast?.on(msg.errMsg(code), 'warning');
            } else {
              props.onSuccess();
              toast?.on(`거절 사유 입력을 완료하였습니다.`, 'success');
              queryClient.invalidateQueries(REQUEST_LIST(router.query));
              return;
            }
          },
          onError: (errMsg) => {
            toast?.on(
              `거절 사유 입력에 실패하였습니다.\n 잠시 후, 다시 시도해 주세요.`,
              'error',
            );
            props.onError();
          },
        },
      );
    }
  }, [msg, mutateDispensingRefuse, props, queryClient, router.query, toast]);

  return { onClickDispensingAccept, onClickMutateDispensingRefuse };
};

export default useMutateDispensingAccept;
