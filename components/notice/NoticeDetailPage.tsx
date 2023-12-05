import { WBoxLayout } from '@components/common/layouts/WLayout';
import useNoticeDetail from '@hooks/apis/notion/hooks/useNoticeDetail';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { WNotionBoardHead } from './styled';
import { ellipsis } from '@styles/common';
import { FlexCenterC, FlexStartC, FlexStartR } from '@styles/flexGrid';
import WNoticeTextarea from '@components/common/inputs/Textarea/modules/WNoticeTextarea';
import { WButton } from '@components/common/button/WButton';
import { useCallback } from 'react';
import { dateFormat } from '@utils/date';
import LoadingErrorFallback from '@components/common/api/LoadingErrorFallback';

const NoticeDetailPage = (props: { id: string }) => {
  const router = useRouter();
  const onClickBack = useCallback(() => {
    const storage = globalThis?.sessionStorage;
    // console.log(storage);
    if (storage.prevPath === storage.currentPath) {
      router.push('/notice');
      return;
    }
    if (storage.prevPath) {
      router.back();
      return;
    }
    router.push('/notice');
  }, [router]);

  const { data, isError, isLoading, isWarning } = useNoticeDetail(props.id);

  return (
    <FlexCenterC gap="26px">
      <WBoxLayout width="100%">
        <LoadingErrorFallback
          data={data}
          isError={isError}
          isLoading={isLoading}
          isWarning={isWarning}
          contexts={(info) => {
            return (
              <>
                <WNotionBoardHead>
                  <FlexStartC gap="12px">
                    <Typography variant="h6" className="title" sx={ellipsis}>
                      {info.data.data.title}
                    </Typography>
                    <FlexStartR gap="16px">
                      <FlexStartR gap="10px">
                        <Typography variant="subtitle2" className="info name">
                          구분
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className="info substance"
                        >
                          {info.data.data.type}
                        </Typography>
                      </FlexStartR>
                      <FlexStartR gap="10px">
                        <Typography variant="subtitle2" className="info name">
                          작성일
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className="info substance"
                        >
                          {dateFormat(info.data.data.createdAt).day}
                        </Typography>
                      </FlexStartR>
                    </FlexStartR>
                  </FlexStartC>
                </WNotionBoardHead>
                <WNoticeTextarea value={info.data.data.content} />
              </>
            );
          }}
        />
      </WBoxLayout>
      <WButton
        onClick={onClickBack}
        variant="contained"
        sx={{
          width: '320px',
        }}
      >
        목록으로 돌아가기
      </WButton>
    </FlexCenterC>
  );
};

export default NoticeDetailPage;
