import WProgressBarCircular from '@components/common/modals/WProgressBarCircular';
import instance from '@hooks/apis/instance';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { Backdrop } from '@mui/material';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserInfoContext } from './UserInfoContext';
import ErrorModal from '@components/auth/signup/modal/ErrorModal';

interface AxiosContextType {
  progressBarDisabled: boolean;
  setProgressBarDisabledFn: (boo: boolean) => void;
  setInProgressBarOn: (boo: boolean) => void;
}

const AxiosContext = createContext<AxiosContextType>({
  progressBarDisabled: false,
  setProgressBarDisabledFn: (boo: boolean) => {
    return;
  },
  setInProgressBarOn: (boo: boolean) => {
    return;
  },
});

export function AxiosProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const toast = useToastContext();
  const { signOut } = useContext(UserInfoContext);
  const [open, setOpen] = useState<boolean>(false);
  const [progressBarOn, setProgressBarOn] = useState<boolean>(false);
  const [progressBarDisabled, setProgressBarDisabled] =
    useState<boolean>(false);

  const setProgressBarDisabledFn = useCallback((boo: boolean) => {
    setProgressBarDisabled(boo);
  }, []);

  const setInProgressBarOn = useCallback((boo: boolean) => {
    setProgressBarOn(boo);
  }, []);

  const value = {
    progressBarDisabled,
    setProgressBarDisabledFn,
    setInProgressBarOn,
  };

  useEffect(() => {
    const interceptorReq = instance.interceptors.request.use(
      (config) => {
        if (config.method !== 'get') {
          if (config.method !== 'OPTIONS') {
            if (!progressBarDisabled) {
              if (config.url !== '/auth/api/v1/refresh') {
                setProgressBarOn(true);
              }
            }
          }
        }

        return config;
      },
      (error) => {
        setProgressBarOn(false);
        setProgressBarDisabled(false);
        console.log(error);
        return Promise.reject(error);
      },
    );

    const interceptor = instance.interceptors.response.use(
      (response) => {
        setTimeout(() => {
          setProgressBarOn(false);
          setProgressBarDisabled(false);
        }, 200);

        const res = response;
        return res;
      },
      async (error) => {
        setTimeout(() => {
          setProgressBarOn(false);
          setProgressBarDisabled(false);
        }, 200);

        if (router.pathname !== '/signin') {
          const status = error.response.status;
          if (status === 498) {
            if (signOut) {
              signOut();
            }
            return;
          }
          setOpen(true);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.request.eject(interceptorReq);
      instance.interceptors.response.eject(interceptor);
    };
  }, [msg, progressBarDisabled, router, signOut, toast]);

  return (
    <AxiosContext.Provider value={value}>
      {children}
      {progressBarDisabled ? (
        <></>
      ) : (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: 99999,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
          }}
          open={progressBarOn}
        >
          <WProgressBarCircular />
        </Backdrop>
      )}
      {open ? (
        <ErrorModal
          open={open}
          handleClose={() => setOpen(false)}
          event={() => {
            if (signOut) {
              signOut();
            }
          }}
        />
      ) : (
        <></>
      )}
    </AxiosContext.Provider>
  );
}
export default AxiosContext;
