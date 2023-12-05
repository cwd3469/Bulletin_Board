import { ParsedUrlQuery } from 'querystring';

export const PROCEED_LIST = (props: ParsedUrlQuery) => [
  'PROCEED',
  'LIST',
  props,
];

export const PREPARATIONREQUEST = (id: string) => [
  'PREPARATION',
  'REQUEST',
  { id },
];

export const PRESCRIPTION = (id: string) => ['PRESCRIPTION', 'HISTORY', { id }];

export const HISTORYSTATUS = () => ['HISTORY', 'STATUS'];
