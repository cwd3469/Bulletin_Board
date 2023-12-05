/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import useValidation from '../useValidation';
import { FileInfo } from './types';
import useDropDrag from './useDropDrag';
import {
  b64DecodeUnicode,
  blobToFile,
  forinArr,
  resizeFileCompression,
} from '@utils/file';
import { ErrorType } from '@components/common/inputs/type';

export interface UseMultiFileUpload {
  multi?: boolean;
  limit?: number;
  onfileUpload?: (
    e: ChangeEvent<HTMLInputElement> | any,
    fileLoader: (event: ChangeEvent<HTMLInputElement> | any) => void,
  ) => Promise<void>;
}

const useFileUpload = (props: UseMultiFileUpload) => {
  const { multi, limit } = props;
  const validation = useValidation();
  const [files, setFile] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<FileInfo[]>([]);
  const [err, setErr] = useState<ErrorType>({ msg: '', boo: false });
  const errorMsgOn = (msg: string) => {
    setErr({ msg, boo: true });
  };
  /** useFileUpload 파일 삭제 기능  */
  const onDeleteuidList = useCallback(
    (number: number) => {
      if (imageSrc.length === 1) {
        setImageSrc([]);
        setFile([]);
        return;
      }
      const newList = imageSrc.filter((item, index) => {
        return index !== number;
      });
      const newFile = files.filter((item, index) => {
        return index !== number;
      });
      setFile(newFile);
      setImageSrc(newList);
    },
    [files, imageSrc],
  );

  /** 파일 업로드 onChange 기능 */
  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      if (props.onfileUpload) {
        props.onfileUpload(e, (event: ChangeEvent<HTMLInputElement> | any) => {
          const selectFile =
            event.type === 'drop'
              ? event.dataTransfer.files
              : event.target.files;
          if (selectFile) {
            const fileArr = forinArr(selectFile);
            let fileList: File[] = [];
            let temp: FileInfo[] = [];
            [].forEach.call(
              selectFile,
              async function (file: File, index: number) {
                if (validation.regExpImage.test(file.type)) {
                  const reader = new FileReader();
                  let imageImg =
                    file.type === 'application/pdf'
                      ? file
                      : file.size < 1000000
                      ? file
                      : await resizeFileCompression(file);
                  reader.readAsDataURL(imageImg);
                  reader.onload = () => {
                    const objectURL = URL.createObjectURL(imageImg);
                    const fileObj = {
                      name: imageImg.name, //파일 이름
                      type: imageImg.type, //파일 정보
                      src: objectURL, // 파일 미리보기
                      index: imageImg.lastModified, // 파일 등록 일수
                    };

                    if (multi) {
                      temp.push(fileObj);
                      fileList.push(imageImg);
                      return;
                    } else {
                      temp = [fileObj];
                      fileList = [imageImg];
                      return;
                    }
                  };
                  reader.onloadend = () => {
                    if (setImageSrc) {
                      const arr = [...imageSrc, ...temp];
                      const fileArr = [...files, ...fileList];
                      if (multi) {
                        if (limit) {
                          if (arr.length <= limit) {
                            setImageSrc(arr);
                            setFile(fileArr);
                          } else {
                            const fileSlice = fileArr.slice(-limit);
                            const slice = arr.slice(-limit);
                            setImageSrc(slice);
                            setFile(fileSlice);
                          }
                        }
                      } else {
                        setImageSrc(temp);
                        setFile(fileList);
                      }
                    }
                  };
                } else {
                  errorMsgOn(
                    '첨부파일은 pdf, jpg, png로 된 이미지만 가능합니다.',
                  );
                  return;
                }
              },
            );
          }
        });
      }
    },
    [files, imageSrc, limit, multi, props, validation.regExpImage],
  );

  /** useFileUpload 파일 업로드 기준 파일 업로드  기능 */
  const onFile = useCallback(
    (fileList: File[]) => {
      if (fileList.length) {
        let fileList: File[] = [];
        let temp: FileInfo[] = [];
        [].forEach.call(
          fileList.length,
          async function (file: File, index: number) {
            if (validation.regExpImage.test(file.type)) {
              const reader = new FileReader();
              let imageImg =
                file.type === 'application/pdf'
                  ? file
                  : file.size < 1000000
                  ? file
                  : await resizeFileCompression(file);
              reader.readAsDataURL(imageImg);
              reader.onload = () => {
                const objectURL = URL.createObjectURL(imageImg);
                const fileObj = {
                  name: imageImg.name, //파일 이름
                  type: imageImg.type, //파일 정보
                  src: objectURL, // 파일 미리보기
                  index: imageImg.lastModified, // 파일 등록 일수
                };
                temp.push(fileObj);
                fileList.push(imageImg);
              };
              reader.onloadend = () => {
                if (setImageSrc) {
                  setImageSrc(temp);
                  setFile(fileList);
                }
              };
            } else {
              errorMsgOn('첨부파일은 pdf, jpg, png로 된 이미지만 가능합니다.');
              return;
            }
          },
        );
      }
    },
    [validation.regExpImage],
  );
  /**useFileUpload 드레그 드랍 파일 업로드 기능 */
  const { dragRef, isDragging } = useDropDrag({ onChangeFile });

  //TODO:수정이 필요함
  const onModifyFile = useCallback(
    (baseFile: File[] | undefined) => {
      if (baseFile) {
        if (baseFile.length) {
          onFile(baseFile);
        }
      } else {
        if (setImageSrc) {
          setImageSrc([]);
        }
        setFile([]);
      }
    },
    [onFile],
  );

  useEffect(() => {
    return () => {
      setImageSrc([]);
      setFile([]);
      setErr({ msg: '', boo: false });
    };
  }, []);

  return {
    onChangeFile,
    onDeleteuidList,
    onModifyFile,
    setImageSrc,
    dragRef,
    isDragging,
    imageSrc,
    files,
    err,
  };
};

export default useFileUpload;
