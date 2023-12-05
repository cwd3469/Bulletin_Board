import { ParsedUrlQuery } from 'querystring';

export const REQUEST_LIST = (props: ParsedUrlQuery) => [
  'REQUEST',
  'LIST',
  props,
];
export const REQUEST_DETAILS = (ulid: string) => ['REQUEST', 'DETAILS', ulid];

export const PREPARATIONREQUEST = (id: string) => [
  'PREPARATION',
  'REQUEST',
  { id },
];

export const PRESCRIPTION = (id: string) => ['PRESCRIPTION', 'HISTORY', { id }];

export const RECEPTION_STATUS = () => ['RECEPTION', 'STATUS'];

export const HISTORYSTATUS = () => ['HISTORY', 'STATUS'];
