import styled from '@emotion/styled';
import { Box, Grid, Link, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/system';
import Image from 'next/image';
import downloadIcon from 'public/assets/icon/downloadIcon.svg';
import copyDisable from 'public/assets/icon/copyDisable.svg';
import { CSSProperties } from 'react';

interface WDownloadBtnType {
  sx?: SxProps<Theme>;
  failed: boolean;
  disabled?: boolean;
  url: string;
  download?: string;
}

const WDownloadBtn = (props: WDownloadBtnType) => {
  const { failed, url, disabled, sx, download } = props;
  return (
    <DownloadBtn
      className={`wDownloadBtn ${
        failed
          ? 'w-download-disabled'
          : url
          ? 'w-download-available'
          : 'w-download-disabled'
      }`}
      href={failed ? undefined : url}
      download={download ? download : true}
      sx={sx}
    >
      <Image src={downloadIcon} alt="copy" />
      <Typography variant="body1" color="#949494" fontWeight="bold">
        다운로드
      </Typography>
    </DownloadBtn>
  );
};

const DownloadBtn = styled(Link)(({ theme }) => ({
  backgroundColor: '#fff',
  textDecoration: 'none',
  border: '1px solid #949494',
  height: '40px',
  width: '100px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',
  '&.w-download-disabled': {
    color: '#b6b6b6',
  },
  '&.w-download-available': {
    color: '#000',
  },
}));

export default WDownloadBtn;
