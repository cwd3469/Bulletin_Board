import { UserInfoInterface } from '@components/auth/types';
import { apiTokenValidation } from '@hooks/apis/auth/common';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { createContext, useCallback, useEffect, useState } from 'react';

interface UserTimer {
  minute: number;
  seconds: number;
}

interface UserInfoContext {
  userInfo?: UserInfoInterface;
  setInUserInfo?: (info: UserInfoInterface) => void;
  handleTokenInfo: () => void;
  deleteToken?: () => void;
  signOut?: () => void;
  time?: (expTime: number) => {
    minute: number;
    seconds: number;
  };
  validTime: UserTimer;
}

const UserInfoContext = createContext<UserInfoContext>({
  handleTokenInfo: () => {
    return;
  },
  validTime: {
    minute: 0,
    seconds: 0,
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserInfoProvider = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const [userInfo, setUserInfo] = useState<UserInfoInterface>();
  const [validTime, setValidTime] = useState<UserTimer>({
    minute: 0,
    seconds: 0,
  });
  /**UserInfoContext 유효 시간 계산 */
  const time = useCallback((expTime: number) => {
    const now = dayjs();
    const exp = expTime * 1000;
    const lastDate = dayjs(exp);
    const diffS = lastDate.diff(now, 's');
    const minute = Math.floor(diffS / 60);
    const m = minute * 60;
    const seconds = diffS - m;
    return { minute, seconds };
  }, []);

  /**UserInfoContext 회원가입 라우팅 기능  */
  const signinPageRoute = useCallback(() => {
    if (router.pathname !== '/signin') {
      router.replace(`/signin`, undefined, {
        shallow: true,
      });
    }
  }, [router]);

  /**UserInfoContext 토큰 삭제 */
  const deleteToken = useCallback(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('permission');
    deleteCookie('refreshCount');
    deleteCookie('patients-list');
    setCookie('authorized', false);
  }, []);

  /**UserInfoContext 로그아웃  */
  const signOut = useCallback(() => {
    deleteToken();
    signinPageRoute();
  }, [deleteToken, signinPageRoute]);

  /**UserInfoContext 토큰 정보 업데이트 */
  const setInUserInfo = useCallback(
    (info: UserInfoInterface) => {
      setValidTime(time(info.exp));
      setUserInfo(info);
    },
    [time],
  );

  /**UserInfoContext 토큰 리프레쉬 */
  const handleTokenInfo = useCallback(async () => {
    const token = getCookie('refreshToken');
    deleteCookie('refreshCount');
    if (typeof document !== 'undefined') {
      const refreshToken = typeof token === 'string' ? token : '';
      if (refreshToken) {
        await apiTokenValidation(refreshToken)
          .then((data) => {
            const code = data.data.code;
            const info = data.data.data;
            if (data) {
              if (code !== '0000') {
                if (code === '0049') {
                  toast?.on(
                    '다른 기기에서 로그인 하였습니다. \n 로그인 페이지로 이동합니다.',
                    'info',
                  );
                  return;
                } else {
                  toast?.on(msg.errMsg(code), 'error');
                }
                signOut();
                return;
              } else {
                setCookie('accessToken', info.accessToken);
                setCookie('refreshToken', info.refreshToken);
                const userinfo: UserInfoInterface = jwtDecode(
                  info.accessToken as string,
                );
                setInUserInfo(userinfo);
              }
            }
          })
          .catch(() => {
            // console.log('4');
            toast?.on(
              '토큰 유효기간이 만료 되었습니다. \n 로그인 페이지로 이동합니다.',
              'error',
            );
            signOut();
          });
      }
    }
  }, [msg, setInUserInfo, signOut, toast]);

  const onMountCookieCheck = useCallback(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      const userinfo: UserInfoInterface = jwtDecode(accessToken as string);
      setInUserInfo(userinfo);
      return;
    }
    signinPageRoute();
    toast?.on('로그인 상태가 아닙니다 \n 로그인 페이지로 이동합니다.', 'error');
  }, [setInUserInfo, signinPageRoute, toast]);

  useEffect(() => {
    if (router.pathname !== '/signin') {
      if (router.pathname !== '/404') {
        if (router.pathname !== '/error') {
          onMountCookieCheck();
        }
      }
    }
  }, [onMountCookieCheck, router.pathname, signinPageRoute, toast]);

  const value = {
    userInfo,
    setInUserInfo,
    handleTokenInfo,
    deleteToken,
    signOut,
    validTime,
    time,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoContext, UserInfoProvider };
