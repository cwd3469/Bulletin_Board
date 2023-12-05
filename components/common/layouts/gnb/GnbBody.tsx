import { Box, Button } from '@mui/material';
import { WLayout, Logo } from '../WLayout';
import GnbTimer from './GnbTimer';
import GnbMyInfo from './GnbMyInfo';
import { GnbExtensionButton } from './GnbButtons';
import { useCallback, useContext, useState } from 'react';
import { useToastContext } from '@hooks/utils/useToastContext';
import { useRouter } from 'next/router';
import { FlexSpaceBetween, GnbNavList } from '../styled';
import usePrepareReceptionChange, {
  usePrepareReceptionStatus,
} from '@hooks/apis/preparation/request/hooks/usePrepareReceptionChange';
import GnbTreatStateModal from './modals/GnbTreatStateModal';
import { UserInfoContext } from '@hooks/contexts/user/UserInfoContext';
import { errorTestUrl } from '@hooks/apis/auth/security';

interface GnbBodyType {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  disabled?: boolean;
}

const GnbBody = (props: GnbBodyType) => {
  const { children, disabled } = props;
  const { userInfo, time } = useContext(UserInfoContext);
  const { data, isLoading, isError } = usePrepareReceptionStatus();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const onClickModalOpen = useCallback(() => {
    setModalOpen(true);
  }, []);
  const onClickModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <WLayout sx={{ padding: '11px 0' }} bg="#fff" containerColor="#fff">
      <FlexSpaceBetween>
        <GnbNavList>
          <Logo
            sx={{
              width: '124px',
              height: '52px',
            }}
          />
          <Box width={'14px'} />
          {children}
        </GnbNavList>
        <GnbNavList>
          {isLoading ? <>isLoading...</> : ''}
          {isError ? <>isError...</> : ''}
          {data ? (
            data.data.code === '0000' ? (
              <>
                <GnbExtensionButton
                  checked={data.data.data.status}
                  onClick={onClickModalOpen}
                />
                <GnbTreatStateModal
                  status={data.data.data.status}
                  open={modalOpen}
                  handleClose={onClickModalClose}
                />
              </>
            ) : (
              <>isError...</>
            )
          ) : (
            <>isError...</>
          )}
          {userInfo?.hasExpiredTime ? <GnbTimer /> : <></>}
          {/* <Button
            variant="contained"
            onClick={async () => {
              const data = await errorTestUrl();
            }}
          >
            error
          </Button> */}
          <GnbMyInfo disabled={disabled} />
        </GnbNavList>
      </FlexSpaceBetween>
    </WLayout>
  );
};
export default GnbBody;
