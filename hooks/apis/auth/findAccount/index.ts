import { VerifyDto } from '@components/auth/findAccount/type';
import { AuthMobileNumber, AuthNumberChack } from '@components/auth/types';
import instance from '@hooks/apis/instance';

/**계정찾기 / 모바일 점유 인증 api */
export const apiFindAccountMobileAuth = (prams: AuthMobileNumber) => {
  return instance({
    method: 'post',
    url: `/auth/api/v2/pharmacy/find-account/mobile-authentication`,
    data: prams,
  });
};

/**계정찾기 / 점유 인증 확인 api */
export const apiFindAccountAuthCheck = (prams: AuthNumberChack) => {
  return instance({
    method: 'post',
    url: `/auth/api/v2/pharmacy/find-account/verify`,
    data: prams,
  });
};
/**계정찾기 / 패스워드 재설정 */
export const apiFindAccountPwReset = (prams: VerifyDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v2/pharmacy/find-account/reset-password`,
    data: prams,
  });
};
