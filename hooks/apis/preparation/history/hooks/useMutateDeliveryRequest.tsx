import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { apiDeliveryRequest } from '..';
import { HISTORY_LIST } from '../queryKey';
import { useRouter } from 'next/router';
import { OnEvent } from '../../proceed/hooks/useMutateDispensingExpenses';
import AxiosContext from '@hooks/contexts/user/AxiosContext';

interface UseDeliveryRequestType {
  id: string;
  dayRequest?: OnEvent;
}
const useMutateDeliveryRequest = (props: UseDeliveryRequestType) => {
  const { id: medicineOrderUlid, dayRequest } = props;
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();
  const info = useContext(AxiosContext);
  /**useMutateDispensingExpenses 배송 요청 useMutation*/
  const { mutate: mutateDeliveryRequest } = useMutation(apiDeliveryRequest);

  /**useMutateDeliveryRequest 택배 요청*/
  const onClickDeliveryRequest = useCallback(() => {
    info.setProgressBarDisabledFn(true);

    if (medicineOrderUlid) {
      mutateDeliveryRequest(medicineOrderUlid, {
        onSuccess: (res) => {
          const code = res.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'info');
          } else {
            const result = res.data.data;
            if (result) {
              toast?.on(
                '해당 조제 건의 배송비 결제에 성공하였습니다.',
                'success',
              );
            } else {
              toast?.on(
                '해당 조제 건의 배송비 결제에 실패하였습니다.',
                'error',
              );
            }
            if (dayRequest && dayRequest.onSuccess) {
              dayRequest.onSuccess();
            }
            queryClient.invalidateQueries(HISTORY_LIST(router.query));
            return;
          }
        },
        onError: (errMsg) => {
          toast?.on(
            `기사 호출 요청에 실패하였습니다 잠시 후, 다시 시도해 주세요.`,
            'error',
          );
        },
      });
    }
  }, [
    dayRequest,
    info,
    medicineOrderUlid,
    msg,
    mutateDeliveryRequest,
    queryClient,
    router.query,
    toast,
  ]);

  return { onClickDeliveryRequest };
};

export default useMutateDeliveryRequest;
