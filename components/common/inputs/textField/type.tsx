import { ErrorType } from '../type';

export interface WTextFieldModulesType {
  state: string;
  err: ErrorType;
  setState: (text: string, keyId: string) => void;
  setErr: (err: ErrorType, keyId: string) => void;
  keyId: string;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}
