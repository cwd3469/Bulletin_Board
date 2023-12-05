import WSwitch from '@components/common/inputs/WSwitch';
import { Box, Button, MenuItem } from '@mui/material';
import colors from '@styles/colors';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { GnbItem, StyledMenu } from '../styled';
import { GnbItemType } from './types';

export const GnbExtensionButton = (props: {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  checked: boolean;
}) => {
  const { onClick, checked } = props;
  const btn = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%',
  };
  const info = {
    fullWidth: '203px',
    switchheight: '32px',
    switchWidth: '102px',
    switchOn: '"조제 접수시작"',
    switchOff: '"조제 접수마감"',
    moveTranslateX: 'translateX(101px)',
    borderRadius: '50px',
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <WSwitch checked={checked} info={info} readOnly />
      <Button sx={btn} onClick={(e) => onClick(e)}></Button>
    </Box>
  );
};

export const GnbItemDropDown = (props: GnbItemType) => {
  const { sx, name, tgtBtn, tgtMenu, itemList, pageName, disabled } = props;
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path: string) => {
    router.push(path);
    setAnchorEl(null);
  };

  const activeItem = useCallback(
    (pageid: string) => {
      const unActive = {
        color: colors.gray_05,
        fontWeight: '300 !important',
        backgroundColor: colors.gray_11,
      };
      const style = {
        color: colors.gray_01,
        fontWeight: 'bold',
        backgroundColor: colors.gray_10,
      };

      return pageName === pageid ? style : unActive;
    },
    [pageName],
  );

  return (
    <div>
      <GnbItem
        sx={sx}
        id={tgtBtn}
        aria-controls={open ? `${tgtMenu}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={disabled}
      >
        {name}
      </GnbItem>
      <StyledMenu
        id={tgtMenu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `${tgtBtn}`,
        }}
      >
        {itemList.map((menu, index) => {
          return (
            <MenuItem
              key={index}
              sx={{ ...activeItem(menu.pageid) }}
              onClick={() => {
                handleClose(menu.path);
              }}
            >
              {menu.name}
            </MenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
};
