import { SxProps, Theme } from '@mui/material';

export interface ModalType {
  open: boolean;
  handleClose: () => void;
}

export interface GnbMobalType extends ModalType {
  timer: string;
  resend: () => void;
}

export interface ItemList {
  name: string;
  path: string;
  pageid: string;
}

export interface GnbItemType {
  sx?: SxProps<Theme>;
  name: string;
  tgtBtn: string;
  tgtMenu: string;
  itemList: ItemList[];
  pageName: string;
  disabled?: boolean;
}
