import {
  SigninDto,
  SigninMobileDto,
  SigninVerifyDto,
} from '@components/auth/signin/type';
import instance from '../../instance';

/**로그인 api */
export const apiSignin = (info: SigninDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v2/pharmacy/signin`,
    data: info,
  });
};
/**로그인 휴대폰 인증 api */
export const apiSigninAuth = (info: SigninMobileDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v2/pharmacy/signin/authentication`,
    data: info,
  });
};
/**로그인 휴대폰 인증 검사 api */
export const apiSigninAuthVerify = (info: SigninVerifyDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v2/pharmacy/signin/authentication/verify`,
    data: info,
  });
};
