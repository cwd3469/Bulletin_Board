/* eslint-disable no-useless-escape */
import { useCallback } from 'react';

import { ErrorType } from '@components/common/inputs/type';

export interface ValidOnlyErr {
  txt: string;
  error:
    | React.Dispatch<React.SetStateAction<ErrorType>>
    | ((props: ErrorType) => void);
}

export interface ValidInterface extends ValidOnlyErr {
  pass: React.Dispatch<React.SetStateAction<string>> | ((txt: string) => void);
}

export class Validation {
  regExAuthNumder: RegExp;
  regExpPhoneNumber: RegExp;
  regBusinessNumber: RegExp;
  regExNumberOnly: RegExp;
  regExpNum: RegExp;
  regExpEmail: RegExp;
  regExpMobileNumber: RegExp;
  regExpMobile: RegExp;
  regExpPhone: RegExp;
  regExpPhoneEight: RegExp;
  regExpBusinessNum: RegExp;
  regExpId: RegExp;
  regPwFormChack: RegExp;
  regExpImage: RegExp;
  regExpFile: RegExp;
  regExFaxNumber: RegExp;
  regNameKo: RegExp;
  regExpAdminNameVerify: RegExp;
  regPharmacyName: RegExp;
  regAddressDetail: RegExp;
  regRefusalDispensing: RegExp;
  regRefusal: RegExp;
  regExpExpenses: RegExp;
  regExpBirthDate: RegExp;
  regExpBirthDateOn: RegExp;

  constructor() {
    /** 유저 아이디 정규식*/
    this.regExpId = /^[a-z0-9]{4,20}$/;

    /** 비밀번호 정규식 전체 형식 체크*/
    this.regPwFormChack =
      /^((?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]))[0-9a-zA-Z!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]{8,16}$/;

    /**한글만 입력 받기 */
    this.regNameKo = /^[ㄱ-ㅎ|가-힣]{0,5}$/;
    this.regExpAdminNameVerify = /^[가-힣]+$/;

    /** 이메일 체크 정규식*/
    this.regExpEmail =
      /^[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s]([-_.]?[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s])*@[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s]([-_.]?[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s])*\.[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s]{2,}$/i;

    // 인증 번호 유효성 정규식
    this.regExAuthNumder = /^[0-9-]{0,6}$/;

    // 일반 전화번호 유효성 정규식 입력
    this.regExpPhoneNumber = /^[0-9-]{0,15}$/;
    this.regExpMobileNumber = /^[0-9-]{0,13}$/;

    /** 일반 전화번호 정규식 */
    this.regExpPhone = /^(\d{2,4})(\d{3,4})(\d{4})$/;
    this.regExpPhoneEight = /^(\d{4})(\d{4})$/;

    /**핸드폰 입력 확인 정규식*/
    this.regExpNum = /[^0-9]/g;

    /**핸드폰번호 전체 형식 정규식*/
    this.regExpMobile = /^(^010)(\d{3,4})(\d{4})$/;

    /** 사업자 등록증 정규식 */
    this.regExpBusinessNum = /^(\d{3})(\d{2})(\d{5})$/;

    /** 진료비 입력 정규식 */
    this.regExpExpenses = /^[0-9,]{0,9}$/;

    /**거절 사유 한글 영어 숫자 20자*/
    this.regRefusal = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,20}$/;

    /**조제 거절 입력*/
    this.regRefusalDispensing = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,20}$/;

    /** 슷자만 확인 */
    this.regExNumberOnly = /^[0-9-]{0,15}$/;

    /** 슷자만 확인 */
    this.regBusinessNumber = /^[0-9-]{0,12}$/;

    /**팩스 유효성 정규식 */
    this.regExFaxNumber = /^[0-9]{0,12}$/;

    /**생년월일 포멧 확인 */
    this.regExpBirthDate =
      /^(19[0-9][0-9]|20\d{2}).(0[0-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1])$/;

    /**생년월일 입력 확인 */
    this.regExpBirthDateOn = /^(\d{4})(\d{2})(\d{2})$/;

    /** 이미지 파일 정규식 */
    this.regExpImage = /pdf|jpg|jpeg|png/i;

    /** PDF 파일만 */
    this.regExpFile = /pdf/i;

    /** 이름 받기*/
    this.regPharmacyName = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{1,15}$/;
    /**상세 주소 받기*/
    this.regAddressDetail = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,15}$/;
  }

  authNumder(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (this.regExAuthNumder.test(txt)) {
      pass(txt);
      if (txt.length === 6) {
        error({
          msg: '',
          boo: false,
        });
      } else {
        error({
          msg: '6자리의 인증 번호를 입력해 주세요.',
          boo: true,
        });
      }
      return;
    }
  }
}

const useValidation = () => {
  const validationClass = useCallback(() => {
    return new Validation();
  }, []);

  const validation = validationClass();
  return validation;
};

export default useValidation;
