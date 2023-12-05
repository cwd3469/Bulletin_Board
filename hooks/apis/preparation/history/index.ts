import { FilterListData } from '@hooks/contexts/filters/type';
import { transQueryDate, transQueryUrl } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import instance from '../../instance';

/** 조제 내역 목록
 * GET API
 */
export const apiHistoryList = (queryUrl: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/pharmacy/api/v2/medicines/orders/history?size=10${queryUrl}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 내역 처방전 정보
 * GET API
 */
export const apiHistoryPrescription = (
  medicineOrderUlid: string,
  prescriptionUlid: string,
) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/pharmacy/api/v2/medicines/orders/history/${medicineOrderUlid}/prescription/${prescriptionUlid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 내역 배송요청
 * GET API
 */
export const apiDeliveryRequest = (prams: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'post',
    url: `/pharmacy/api/v2/medicines/orders/history/${prams}/deliveries`,
    headers: {
      Authorization: accessToken,
    },
  });
};
