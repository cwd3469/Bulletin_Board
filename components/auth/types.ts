import { ErrorType } from '@components/common/inputs/type';
import { ChangeEvent } from 'react';

export interface UserInfoInterface {
  accountId: string;
  roles: string[];
  nameKo: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  needResetPassword: boolean;
  accountType: string;
  credentialsNonExpired: boolean;
  disabledReason: string;
  enabled: boolean;
  exp: number;
  iat: number;
  iss: string;
  mobileNum: string;
  service: string;
  sub: string;
  ulid: string;
  hasExpiredTime:boolean
}

export interface AuthMobileViewType {
  open: boolean;
  authValue: string;
  mobileValue: string;
  authDisabled: boolean;
  btnDisabled?: boolean;
  bgDisable: boolean;
  numDisabled: boolean;
  authError: ErrorType;
  mobileDisabled?: boolean;
  authOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mobileOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTimerDisabled: () => void;
  mobileError: ErrorType;
  focusOutEvent: () => void;
  onClickAuthNumSend: () => void;
  signupAuthOnClick: () => void;
  resetModalClose: () => void;
  timerActice: () => void;
  timerResend: () => void;
}

export interface AuthMobileNumber {
  mobileNum: string;
}

export interface AuthNumberChack extends AuthMobileNumber {
  code: string;
}
