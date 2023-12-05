import { Gnb } from '@components/common/layouts/gnb/Gnb';
import { WLayout } from '@components/common/layouts/WLayout';
import NoticeDetailPage from '@components/notice/NoticeDetailPage';
import { NoticeFilterProvider } from '@hooks/contexts/filters/NoticeFilterContext';
import { useRouter } from 'next/router';

const NoticeDetail = () => {
  const router = useRouter();
  const id = router.query.id;
  return (
    <NoticeFilterProvider>
      <div>
        {/* <Gnb />
        <WLayout>{id ? <NoticeDetailPage id={id as string} /> : ''}</WLayout> */}
      </div>
    </NoticeFilterProvider>
  );
};

export default NoticeDetail;
