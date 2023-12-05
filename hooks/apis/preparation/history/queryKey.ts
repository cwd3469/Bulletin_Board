import { ParsedUrlQuery } from 'querystring';

export const HISTORY_LIST = (props: ParsedUrlQuery) => [
  'HISTORY',
  'LIST',
  props,
];
