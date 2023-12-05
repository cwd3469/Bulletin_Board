import { WNotionBoardBody } from '@components/notice/styled';
import 'react-quill/dist/quill.snow.css';

interface WNoticeTextareaType {
  value: string;
}

const WNoticeTextarea = (props: WNoticeTextareaType) => {
  const { value } = props;

  return (
    <WNotionBoardBody>
      <div
        className="ql-editor"
        style={{ position: 'relative' }}
        dangerouslySetInnerHTML={{ __html: value }}
      ></div>
    </WNotionBoardBody>
  );
};

export default WNoticeTextarea;
