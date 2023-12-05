import { Dispatch, SetStateAction } from 'react';

export interface WMultiDragDrop {
  fileUpLoad: (file: File[], uidList?: FileInfo[], max?: number) => void;
  files: File[];
  setFileList?: Dispatch<SetStateAction<File[]>>;
  label?: string;
  target?: string;
  multi: boolean;
  limit?: number;
}

export interface FileInfo {
  name: string; //파일 이름
  type: string; //파일 정보
  utf8?: string; //파일 다운로드 utf8;
  src: string; // 파일 미리보기
  index: number; // 파일 등록 일수
}

export interface FileUid {
  fileUlid: string;
  sort: number;
}

export interface FileDto extends FileUid {
  fileUrl: string;
}
