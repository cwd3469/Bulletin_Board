import { AuthMobileNumber, AuthNumberChack } from '@components/auth/types';
import instance from '@hooks/apis/instance';

/**공용 / 모바일 점유 인증 api */
export const apiCommonMobileAuth = (prams: AuthMobileNumber) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/mobile-authentication`,
    data: prams,
  });
};

export const apiTokenValidation = (token: string) => {
  const refreshToken = { refreshToken: token };
  return instance({
    method: 'post',
    url: `/auth/api/v1/refresh`,
    data: JSON.stringify(refreshToken),
  });
};

/**공용 / 점유 인증 확인 api */
export const apiCommonAuthCheck = (prams: AuthNumberChack) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/mobile-authentication/verify`,
    data: prams,
  });
};

/**핑 api */
export const ping = () => {
  return instance({
    method: 'get',
    url: `/pharmacy/api/v2/ping`,
  });
};
