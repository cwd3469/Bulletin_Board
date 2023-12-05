import {
  b64DecodeUnicode,
  dataURItoFile,
  resizeFileCompression,
} from '@utils/file';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useToastContext } from '../useToastContext';
import useCodeMsgBundle from '../useCodeMsgBundle';
import { FileInfo } from './types';
import { AxiosPromise } from 'axios';
import { Box, Stack } from '@mui/material';
import WPdfView from '@components/common/editor/WPdfView';

const usePrescriptionPreview = (props: {
  medicineOrderUlid?: string;
  prescriptionUlid?: string;
  handleClose: () => void;
  apiFileBase: (
    medicineOrderUlid: string,
    prescriptionUlid: string,
  ) => AxiosPromise<any>;
}) => {
  const [fileArr, setFileArr] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<FileInfo[]>([]);
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const reset = useCallback(() => {
    props.handleClose();
    setFileArr([]);
    setImageUrl([]);
  }, [props]);

  const onImagePreview = useCallback(
    async (medicineOrderUlid: string, prescriptionUlid: string) => {
      let arr: File[] = [];
      let temp: FileInfo[] = [];

      await props
        .apiFileBase(medicineOrderUlid, prescriptionUlid)
        .then(async (data) => {
          const code = data.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'error');
            reset();
            return;
          } else {
            const res = data.data.data;
            const file = dataURItoFile(res, '처방전');
            const reader = new FileReader();
            let imageImg =
              file.type === 'application/pdf'
                ? file
                : file.size < 1000000
                ? file
                : await resizeFileCompression(file);
            reader.readAsDataURL(imageImg);
            reader.onload = () => {
              const utf8 = b64DecodeUnicode(res);
              const objectURL = URL.createObjectURL(imageImg);
              const fileObj = {
                name: imageImg.name, //파일 이름
                type: imageImg.type, //파일 정보
                src: objectURL, // 파일 미리보기
                index: imageImg.lastModified, // 파일 등록 일수
                utf8: utf8,
              };
              temp.push(fileObj);
              arr.push(imageImg);
            };
            reader.onloadend = () => {
              setImageUrl(temp);
              setFileArr(arr);
            };
          }
        })
        .catch((res) => {
          toast?.on(
            `처방전 조회에 실패 하셨습니다. \n 잠시후 다시 시도하세요.`,
            'error',
          );
          reset();
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (props.medicineOrderUlid && props.prescriptionUlid) {
      onImagePreview(props.medicineOrderUlid, props.prescriptionUlid);
    }
  }, [onImagePreview, props.medicineOrderUlid, props.prescriptionUlid]);

  return { fileArr, imageUrl, reset };
};

export const OneImagePreviewComponent = (props: {
  fileArr: File[];
  imageUrl: FileInfo[];
}) => {
  return (
    <Stack alignItems="center" height="100%">
      <>
        {props.fileArr.length ? (
          props.fileArr[0].type === 'application/pdf' ? (
            <WPdfView pdf={props.fileArr[0]} />
          ) : (
            <Stack sx={{ width: '600px' }}>
              <img src={props.imageUrl[0]?.src} alt="처방전" />
            </Stack>
          )
        ) : (
          ''
        )}
        <Box height="60px" />
      </>
    </Stack>
  );
};

export default usePrescriptionPreview;
