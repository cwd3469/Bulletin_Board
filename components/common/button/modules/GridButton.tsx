import { WButton } from '../WButton';
import Image from 'next/image';
import copyIcon from 'public/assets/icon/copyIcon.svg';
import copyDisable from 'public/assets/icon/copyDisable.svg';
import { Button, SxProps, Theme, Typography } from '@mui/material';

export const GridButton = (props: {
  onClick?: () => void;
  children: string | JSX.Element;
  disabled?: boolean;
  style?: SxProps<Theme>;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}) => {
  const {
    onClick,
    children,
    disabled,
    style,
    startIcon: StartIcon,
    endIcon: EndIcon,
  } = props;

  return (
    <Button
      disabled={disabled}
      variant="outlined"
      color="info"
      size="small"
      onClick={onClick}
      sx={{
        minWidth: '96px',
        borderRadius: '6px',
        border: '1px solid #e0e1e2',
        padding: '5px 8px',
        backgroundColor: '#fff',
        color: '#000',
        gap: '4px',
        '&.Mui-disabled': {
          backgroundColor: '#f8f8f8',
          '& .WIcon': {
            '& path': {
              fill: '#999',
            },
          },
        },
        ...style,
      }}
    >
      {StartIcon ? (
        StartIcon
      ) : (
        <Image src={disabled ? copyDisable : copyIcon} alt="copy" />
      )}
      <Typography variant="caption" letterSpacing={'-1px'} marginTop="2px">
        {children}
      </Typography>
      {EndIcon ? EndIcon : ''}
    </Button>
  );
};

GridButton.defaultProps = {
  disabled: false,
};

export default GridButton;
