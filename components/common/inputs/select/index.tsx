import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  SvgIcon,
  SxProps,
  Theme,
} from '@mui/material';
import { CSSProperties } from 'react';

export interface OptionType {
  id: string;
  name: string;
}

const UnfoldMoreTwoToneIcon = () => (
  <SvgIcon>
    <svg
      width="20"
      height="20"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5556 9.5L6.27778 6L2 9.5"
        stroke="#CCCCCC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 15.3333L6.27778 18.8333L10.5556 15.3333"
        stroke="#CCCCCC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SvgIcon>
);

const SelectControl = styled(FormControl)(({ theme }) => ({
  backgroundColor: '#fff',
  maring: 0,
  borderRadius: '6px',

  '& .MuiInputBase-root': {
    borderRadius: '6px',
  },
  '& .MuiSelect-select': {
    padding: '10px 0px 10px 14px',
    paddingRight: '0px !important',
    color: '#666',
  },
  // Mui-focused
  '& .Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));
export interface OptionType {
  id: string;
  name: string;
}

export type WSelectCustomizeType = {
  value?: string;
  callBack: (id: string) => void;
  width?: string;
  disabled?: boolean;
  name?: string;
};

interface WSelectType {
  name?: string;
  value: string;
  width: string;
  height?: string;
  disabled?: boolean;
  onChange: (event: SelectChangeEvent) => void;
  options: OptionType[];
  MenuProps?: SxProps<Theme>;
  sx?: SxProps<Theme>;
  SelectDisplayProps?: CSSProperties;
}

const WSelect = (props: WSelectType) => {
  const {
    name,
    value,
    onChange,
    options,
    width,
    MenuProps,
    SelectDisplayProps,
    height,
    disabled,
    sx,
  } = props;

  return (
    <SelectControl size="small" sx={{ width: width }}>
      <Select
        labelId={name}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        SelectDisplayProps={{
          style: { ...SelectDisplayProps },
        }}
        sx={sx}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              borderRadius: '6px',
              borderColor: '#E0E1E2',
              boxShadow: '0px 2px 10px 0px #00000014',
              marginLeft: '0px',
              marginTop: '5px',
              height: height,
              '& .MuiList-root': {
                padding: '8px',
                width: `${width}`,
              },
            },

            '& .MuiButtonBase-root': {
              padding: '8px',
              borderRadius: '6px',
              color: '#666',

              '&.Mui-selected': {
                backgroundColor: '#F5F5F5',
              },
            },
            ...MenuProps,
          },
        }}
        IconComponent={UnfoldMoreTwoToneIcon}
        autoWidth
      >
        {options.map((option, index) => {
          return (
            <MenuItem value={option.id} key={index}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </SelectControl>
  );
};

export default WSelect;
