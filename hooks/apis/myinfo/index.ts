import { getCookie } from 'cookies-next';
import instance from '../instance';

export const apiPharmacyAdminMyinfo = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `pharmacy/api/v2/my-info`,
    headers: {
      Authorization: accessToken,
    },
  });
};
