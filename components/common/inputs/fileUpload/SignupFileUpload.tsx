/* eslint-disable @typescript-eslint/no-explicit-any */
import useFileUpload from '@hooks/utils/fileUpload/useFileUpload';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { blobToFile, forinArr, resizeFileCompression } from '@utils/file';
import { ChangeEvent, useCallback, useRef } from 'react';
import { DefaltInfo, SignupFileLadel, ImageView, FileName } from './styled';

interface SignupFileUploadProps {
  onDeleteLogoUid: () => void;
  onUploadFile: (file: File) => void;
  name: string;
  placeholder?: string;
}

const SignupFileUpload = (props: SignupFileUploadProps) => {
  const { onDeleteLogoUid, onUploadFile, name, placeholder } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeFileLoad = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement> | any,
      fileLoader: (event: ChangeEvent<HTMLInputElement> | any) => void,
    ) => {
      const selectFile =
        e.type === 'drop' ? e.dataTransfer.files : e.target.files;
      const fileList = forinArr(selectFile);
      if (fileList.length) {
        const imgName = fileList[0].name;
        const item: File = fileList[0];
        let imageImg =
          item.type === 'application/pdf'
            ? item
            : item.size < 1000000
            ? item
            : await resizeFileCompression(item);
        const img = blobToFile(imageImg, imgName);
        onUploadFile(img);
        fileLoader(e);
      }
    },
    [onUploadFile],
  );

  const fileUploadHook = useFileUpload({
    onfileUpload: onChangeFileLoad,
  });

  const onDeleteFile = useCallback(
    (index: number) => {
      fileUploadHook.onDeleteuidList(index);
      onDeleteLogoUid();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [fileUploadHook, onDeleteLogoUid],
  );

  return (
    <Grid container flexDirection="column">
      <input
        onChange={fileUploadHook.onChangeFile}
        type="file"
        id={name}
        style={{ display: 'none' }}
        accept=".jpg,.png,.jpeg,.pdf"
        multiple={false}
        ref={fileInputRef}
      />

      <Grid container gap="10px" justifyContent={'flex-start'}>
        {fileUploadHook.imageSrc.length ? (
          fileUploadHook.imageSrc.map((img, inx) => {
            return (
              <Stack key={inx}>
                <Box height="12px" />
                <FileName>{img.name}</FileName>
                <Box height="8px" />
                <ImageView
                  inx={inx}
                  img={img}
                  file={fileUploadHook.files[0]}
                  deleteImg={onDeleteFile}
                />
              </Stack>
            );
          })
        ) : (
          <Stack>
            <Box height="12px" />
            <FileName className="non-file">{placeholder}</FileName>
            <Box height="8px" />
            <SignupFileLadel
              className={fileUploadHook.isDragging ? 'drag-in' : 'drag-out'}
              ref={fileUploadHook.dragRef}
              htmlFor={name}
            >
              <DefaltInfo
                sx={{
                  '& .uploadBtn': {
                    marginTop: '15px',
                  },
                }}
              />
            </SignupFileLadel>
          </Stack>
        )}
      </Grid>
      <Box height="5px" />
      <Box width="100%" height="12px">
        <Typography color="red" lineHeight="1">
          {fileUploadHook.err.boo ? fileUploadHook.err.msg : ''}
        </Typography>
      </Box>
    </Grid>
  );
};

export default SignupFileUpload;
