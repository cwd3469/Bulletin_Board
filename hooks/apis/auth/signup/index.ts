import instance from '../../instance';

/**회원가입 api */
export const apiSignupInfo = (info: FormData) => {
  return instance({
    method: 'post',
    url: `/auth/api/v2/pharmacy/signup`,
    data: info,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
