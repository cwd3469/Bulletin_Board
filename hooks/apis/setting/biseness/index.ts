import { WeekDataBundlePharmacy } from '@components/setting/businessHour/type';
import instance from '@hooks/apis/instance';
import { getCookie } from 'cookies-next';

/** 영업시간 설정
 * GET API
 */
export const apiBusinesssSet = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `pharmacy/api/v2/profile/pharmacy`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiPharmacyProflieModify = (prams: WeekDataBundlePharmacy) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `pharmacy/api/v2/profile/pharmacy`,
    data: prams,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const BUSINESS = () => ['BUSINESS', 'SET', 'GET'];
