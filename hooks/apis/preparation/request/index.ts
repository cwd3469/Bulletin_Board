import { getCookie } from 'cookies-next';
import instance from '../../instance';
import { commaRemove } from '@utils/formatNumber';

/** 조제 요청 목록
 * GET API
 */
export const apiRequestList = (queryUrl: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `pharmacy/api/v2/medicines/orders/requests?size=10${queryUrl}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 요청 처방전 정보
 * GET API
 */
export const apiPrescriptionFileBase = (
  medicineOrderUlid: string,
  prescriptionUlid: string,
) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `pharmacy/api/v2/medicines/orders/requests/${medicineOrderUlid}/prescription/${prescriptionUlid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 거절
 * PUT API
 */
export const apiDispensingRefuse = (props: {
  msg: string;
  medicineOrderUlid: string;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const dto = {
    refuseReason: props.msg,
  };

  return instance({
    method: 'put',
    url: `pharmacy/api/v2/medicines/orders/requests/${props.medicineOrderUlid}/refuse`,
    data: dto,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 수락
 * PUT API
 */
export const apiDispensingAccept = (props: {
  msg: string;
  medicineOrderUlid: string;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const dto = {
    medicineCost: Number(commaRemove(props.msg)),
  };

  return instance({
    method: 'put',
    url: `pharmacy/api/v2/medicines/orders/requests/${props.medicineOrderUlid}/accept`,
    data: dto,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 상태 조회 GET API */
export const apiPrepareReceptionStatus = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/pharmacy/api/v2/pharmacy/status`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 조제 상태 변경 open PUT API */
export const apiPrepareReceptionStatusOpen = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'put',
    url: `/pharmacy/api/v2/pharmacy/open`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 조제 상태 변경 close PUT API */
export const apiPrepareReceptionStatusClose = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'put',
    url: `/pharmacy/api/v2/pharmacy/close`,
    headers: {
      Authorization: accessToken,
    },
  });
};
