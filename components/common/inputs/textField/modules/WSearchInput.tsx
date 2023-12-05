import Image from 'next/image';
import { Box, IconButton, styled, SxProps, TextField } from '@mui/material';
import sreach from 'public/assets/icon/search.svg';
import { useEffect, useState } from 'react';
import { Theme } from '@mui/system';
import { useDebounceFn } from 'ahooks';

export const SearchTextField = styled(TextField)(({ theme }) => ({
  width: '300px',
  backgroundColor: '#fff',
  ...theme.typography.body1,
  borderRadius: '6px',
  '& .MuiInputBase-input': {
    border: '1px solid #e0e1e2',
    padding: '10px 40px 10px 10px',
    color: '#000',
    borderRadius: '6px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E0E1E2',
    borderRadius: '6px',
  },
}));

const WSearchInput = (props: {
  queryValue?: string;
  search: (txt: string) => void;
  placeholder: string;
  sx?: SxProps<Theme>;
}) => {
  const { search, placeholder, sx } = props;
  const [value, setValue] = useState<string>('');
  const handleEvent = useDebounceFn(
    () => {
      search(value);
    },
    {
      wait: 300,
    },
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleEvent.run();
    }
  };

  useEffect(() => {
    if (props.queryValue) {
      setValue(props.queryValue);
    }
  }, [props.queryValue]);

  return (
    <Box position="relative">
      <SearchTextField
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        sx={sx}
      />
      <IconButton
        sx={{
          position: 'absolute',
          right: '3px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        onClick={handleEvent.run}
      >
        <Box
          sx={{
            width: '18px',
            height: '18px',
            position: 'relative',
          }}
        >
          <Image src={sreach} alt="검색아이콘" layout="fill" />
        </Box>
      </IconButton>
    </Box>
  );
};

export default WSearchInput;
