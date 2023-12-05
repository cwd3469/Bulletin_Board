import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  apiPrepareReceptionStatus,
  apiPrepareReceptionStatusClose,
  apiPrepareReceptionStatusOpen,
} from '..';
import { RECEPTION_STATUS } from '../queryKey';

/**조제 접수 상태 조회 리엑트 쿼리 */
export const usePrepareReceptionStatus = () => {
  return useQuery(RECEPTION_STATUS(), async () => {
    return await apiPrepareReceptionStatus();
  });
};

/**조제 접수 상태 변경 리엑트 쿼리 */
const usePrepareReceptionChange = (prosp: {
  handleClose: () => void;
}): {
  onClickPrepareReceptionStatusClose: () => void;
  onClickPrepareReceptionStatusOpen: () => void;
} => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();
  const { mutate: mutatePrepareReceptionStatusOpen } = useMutation(
    apiPrepareReceptionStatusOpen,
  );
  const { mutate: mutatePrepareReceptionStatusClose } = useMutation(
    apiPrepareReceptionStatusClose,
  );

  /**usePrepareReceptionOnOff 조제 접수 상태 close*/
  const onClickPrepareReceptionStatusClose = useCallback(() => {
    // console.log('close');
    mutatePrepareReceptionStatusClose(undefined, {
      onSuccess(data, variables, context) {
        const code = data.data.code;
        if (code !== '0000') {
          toast?.on(msg.errMsg(code), 'info');
          return;
        } else {
          queryClient.invalidateQueries(RECEPTION_STATUS());
          prosp.handleClose();
        }
      },
      onError(error, variables, context) {
        toast?.on(
          '접수 상태 변경에 실패하였습니다 \n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
  }, [msg, mutatePrepareReceptionStatusClose, prosp, queryClient, toast]);

  /**usePrepareReceptionOnOff 조제 접수 상태 open*/
  const onClickPrepareReceptionStatusOpen = useCallback(() => {
    // console.log('open');
    mutatePrepareReceptionStatusOpen(undefined, {
      onSuccess(data, variables, context) {
        const code = data.data.code;
        if (code !== '0000') {
          toast?.on(msg.errMsg(code), 'info');
          return;
        } else {
          queryClient.invalidateQueries(RECEPTION_STATUS());
          prosp.handleClose();
        }
      },
      onError(error, variables, context) {
        toast?.on(
          '접수 상태 변경에 실패하였습니다 \n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
  }, [msg, mutatePrepareReceptionStatusOpen, prosp, queryClient, toast]);

  return {
    onClickPrepareReceptionStatusOpen,
    onClickPrepareReceptionStatusClose,
  };
};

export default usePrepareReceptionChange;
