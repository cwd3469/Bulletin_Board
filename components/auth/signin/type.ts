import { ErrorType } from '@components/common/inputs/type';
import { ModalType } from '@components/common/layouts/gnb/types';

export type SigninState =
  | 'disable'
  | 'dormant'
  | 'not-approved'
  | 'first'
  | 'excess'
  | 'success';

export interface ProcessType extends ModalType {
  label: SigninState;
}

export interface SigninDto {
  [key: string]: string;
  accountId: string;
  password: string;
}
export interface SigninMobileDto {
  accountMobileNum: string;
}
export interface SigninVerifyDto {
  verificationCode: string;
  authenticationCode: string;
}

export interface SigninErr {
  [key: string]: ErrorType;
  accountId: ErrorType;
  password: ErrorType;
}

export interface SigninInfoType {
  verificationCode: string;
  accountMobileNum: string;
}
