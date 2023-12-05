import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserInfoContext } from './UserInfoContext';

const ReactQueryClientProvider = (props: {
  children: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();
  const { handleTokenInfo } = useContext(UserInfoContext);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1800000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchInterval: 1800000,
            retry: 1,
          },
          mutations: {
            retry: 1,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess(data: any, variables, context) {
              if (router.pathname !== '/signin') {
                if (data.config.url !== 'auth/api/v1/refresh') {
                  handleTokenInfo();
                }
              }
            },
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
