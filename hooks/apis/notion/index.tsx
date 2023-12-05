import { FilterNoticeType } from '@hooks/contexts/filters/type';
import { transQueryDate, transQueryUrl } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import instance from '../instance';
import { ParsedUrlQuery } from 'querystring';

/** 공지사항 목록
 * GET API
 */
export const apiNoticeList = (query: ParsedUrlQuery) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const queryUrl = transQueryUrl(query);

  return instance({
    method: 'get',
    url: `backoffice/api/v2/notice?size=10&channel=PHARMACY${queryUrl}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 공지사항 상세
 * GET API
 */
export const apiNoticeDetail = (prams: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `backoffice/api/v2/notice/${prams}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
