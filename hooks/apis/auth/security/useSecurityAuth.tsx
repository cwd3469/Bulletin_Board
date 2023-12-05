import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SECURITY_SETTING } from '../queryKey';
import { securityGet, securityPut } from '.';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { useRouter } from 'next/router';
import { SecurityDto } from '@components/setting/security/SecurityPage';
import { useToastContext } from '@hooks/utils/useToastContext';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';

const useSecurityAuth = () => {
  const { data, isError, isLoading } = useQuery(SECURITY_SETTING, async () => {
    return await securityGet();
  });
  const router = useRouter();
  const code = data?.data.code;

  const { isWarning } = useCodeWarningEffect({
    code: code,
    codeCallBack(code) {
      router.replace('/preparation/history');
    },
  });

  return { data, isError, isLoading, isWarning };
};
const useSecurityAuthUpdate = () => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const queryClient = useQueryClient();
  const { mutate: mutateSecurityUpdate } = useMutation(securityPut);
  const securityUpdate = (dto: SecurityDto) => {
    mutateSecurityUpdate(dto, {
      onSuccess: (res, variables, context) => {
        if (res.data.code !== '0000') {
          toast?.on(msg.errMsg(res.data.code), 'info');
          return;
        } else {
          toast?.on('보안 설정 수정을 완료하였습니다.', 'success');
          queryClient.invalidateQueries(SECURITY_SETTING);
        }
      },
      onError: (error, variable, context) => {
        toast?.on(
          '보안 설정 수정에 실패하였습니다. \n 잠시 후, 다시 시도해 주세요.',
          'error',
        );
      },
    });
  };

  return { securityUpdate };
};

export { useSecurityAuth, useSecurityAuthUpdate };
