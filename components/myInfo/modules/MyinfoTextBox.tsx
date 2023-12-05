import { BoxDisabledText } from '@components/common/box/modules/TextBox';
import WSubTitle from '@components/common/typography/WSubTitle';
import { SxProps, Theme } from '@mui/material';
import { FlexCenterC, FlexCenterR, FlexStartC } from '@styles/flexGrid';

const MyInfoTextBox = (props: {
  title: string;
  children: string | JSX.Element;
  sx?: SxProps<Theme>;
}) => {
  const { title, children, sx } = props;
  return (
    <FlexStartC width="370px" gap="16px" sx={sx}>
      <WSubTitle
        title={title}
        sx={{
          '& .MuiTypography-root': {
            lineHeight: '24px',
          },
        }}
      />
      <BoxDisabledText className="disabled-text">{children}</BoxDisabledText>
    </FlexStartC>
  );
};

export default MyInfoTextBox;
