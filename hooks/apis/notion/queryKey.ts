import { FilterNoticeType } from '@hooks/contexts/filters/type';
import { ParsedUrlQuery } from 'querystring';

export const NOTICELIST = (query: ParsedUrlQuery) => [
  'NOTICE',
  'LIST',
  { ...query },
];
export const NOTICEDETAIL = (ulid: string) => ['NOTICE', 'DETAIL', ulid];
