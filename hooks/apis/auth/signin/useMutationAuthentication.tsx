import {
  SigninInfoType,
  SigninMobileDto,
  SigninState,
  SigninVerifyDto,
} from '@components/auth/signin/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { mobileFormatOff } from '@utils/formatNumber';
import { useCallback, useContext } from 'react';
import { useMutation } from 'react-query';
import { apiSigninAuth, apiSigninAuthVerify } from '.';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { UserInfoContext } from '@hooks/contexts/user/UserInfoContext';
import { UserInfoInterface } from '@components/auth/types';
import jwtDecode from 'jwt-decode';

interface UseMutationAuthentication {
  info: SigninInfoType;
  authenticationCode: string;
  hanbleClose: () => void;
  onOpenTextFiled: () => void;
  onOpenProcess: (label: SigninState) => void;
}

/** 휴대폰 인증 mutation custom hook
 * 로그인 ( SigninMobileAuth )
 */
const useMutationAuthentication = (props: UseMutationAuthentication) => {
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { setInUserInfo } = useContext(UserInfoContext);
  const { mutate: mutateSigninAuth } = useMutation(apiSigninAuth);
  const { mutate: mutateSigninAuthVerify } = useMutation(apiSigninAuthVerify);
  //휴대폰 인증 요청
  const onClickMobileAuthRequest = useCallback(() => {
    const dto: SigninMobileDto = {
      accountMobileNum: mobileFormatOff(props.info.accountMobileNum),
    };
    mutateSigninAuth(dto, {
      onSuccess(res, variables, context) {
        const code = res.data.code;
        const data = res.data.data;
        if (code !== '0000') {
          toast?.on(msg.errMsg(code), 'info');
          if (code === '9999') {
            props.hanbleClose();
            return;
          }
          return;
        } else {
          props.onOpenTextFiled();

          return;
        }
      },
      onError(error, variables, context) {
        toast?.on(
          '인증번호가 일치하지 않습니다 \n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
  }, [msg, mutateSigninAuth, props, toast]);
  //휴대폰 인증 번호 검사
  const onClickMobileAuthVerify = useCallback(() => {
    const dto: SigninVerifyDto = {
      verificationCode: props.info.verificationCode,
      authenticationCode: props.authenticationCode,
    };
    mutateSigninAuthVerify(dto, {
      onSuccess(res, variables, context) {
        const code = res.data.code;
        const data = res.data.data;
        if (code !== '0000') {
          switch (code) {
            /// 가입 대기
            case '0050':
              props.onOpenProcess('not-approved');
              return;
            /// 휴면 상태
            case '0051':
              props.onOpenProcess('dormant');
              return;
            /// 운영팀에 의해 정지된 계정
            case '0055':
              props.onOpenProcess('disable');
              return;
            case '9999':
              props.hanbleClose();
              return;
            default:
              toast?.on(msg.errMsg(code), 'info');
              return;
          }
        } else {
          const { accountUlid, service, refreshToken, accessToken } = data;
          setCookie('accessToken', accessToken);
          setCookie('refreshToken', refreshToken);
          setCookie('authorized', true);
          const userinfo: UserInfoInterface = jwtDecode(accessToken as string);
          if (setInUserInfo) {
            setInUserInfo(userinfo);
          }
          router.replace('/preparation/request');
          return;
        }
      },
    });
  }, [props, mutateSigninAuthVerify, toast, msg, setInUserInfo, router]);

  return { onClickMobileAuthRequest, onClickMobileAuthVerify };
};

export default useMutationAuthentication;
