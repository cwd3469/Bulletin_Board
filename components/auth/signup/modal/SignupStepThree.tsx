import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { ItemInput } from '../styled';
import { SignupStepThreeType } from '../type';
import WAlert from '@components/common/modals/WAlert';
import SignupFileUpload from '@components/common/inputs/fileUpload/SignupFileUpload';
import WAddressSearch from '@components/common/inputs/WAddressSearch';
import {
  WAddressDetailTextField,
  WAdminNameTextField,
  WBusinessNumTextField,
  WFaxTextField,
  WPharmcyNameTextField,
  WPhoneTextField,
  WPwTextField,
  WRepwTextField,
  WUseridTextField,
} from '@components/common/inputs/textField/modules';
import useSignup from '@components/auth/hooks/useSignup';
import useMutationSignup from '@hooks/apis/auth/signup/useMutationSignup';
import SigninNotApproved from '@components/auth/signin/modal/SigninNotApproved';
import WEmailTextField from '@components/common/inputs/textField/modules/WEmailTextField';
import { makeStyles } from '@mui/styles';
import { useDebounceFn, useKeyPress } from 'ahooks';
import { useRef } from 'react';

const useStyles = makeStyles((theme) => ({
  modalStyle: {
    '& .title-stack': {
      padding: '64px 40px 20px',
    },
  },
}));

const SignupStepThree = (props: SignupStepThreeType) => {
  const classes = useStyles();
  const signup = useSignup(props);
  const { onClickSignup } = useMutationSignup({
    info: signup.info,
    mobileValue: props.mobileValue,
    handleOpenModal: signup.handleOpenModal,
  });
  const onClickSignupHook = useDebounceFn(onClickSignup, {
    wait: 300,
  });

  useKeyPress('enter', () => {
    if (!signup.btnDisable) {
      onClickSignupHook.run();
    }
  });

  return (
    <>
      <WAlert
        open={signup.open}
        handleClose={signup.handleCloseAll}
        maxWidth={'xl'}
        btnTitle="다음"
        handleEvent={onClickSignupHook.run}
        disabled={signup.btnDisable}
        activeOn
        closeBtnOn
        title=" 정보 입력"
        className={classes.modalStyle}
      >
        <Stack gap="40px">
          <Grid container justifyContent={'space-between'}>
            <Stack width="344px" gap="8px">
              <ItemInput title="아이디" require>
                <WUseridTextField
                  state={signup.info.id}
                  err={signup.infoErr.idErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'id'}
                />
              </ItemInput>
              <ItemInput title="비밀번호 입력" require>
                <WPwTextField
                  state={signup.info.pw}
                  err={signup.infoErr.pwErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'pw'}
                />
              </ItemInput>
              <ItemInput title="비밀번호 확인" require>
                <WRepwTextField
                  pw={signup.info.pw}
                  state={signup.info.rePw}
                  err={signup.infoErr.rePwErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'rePw'}
                />
              </ItemInput>
              <ItemInput title="담당자 이름" require>
                <WAdminNameTextField
                  state={signup.info.name}
                  err={signup.infoErr.nameErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'name'}
                />
              </ItemInput>
              <ItemInput title="담당자 이메일" require>
                <WEmailTextField
                  state={signup.info.email}
                  err={signup.infoErr.emailErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'email'}
                />
              </ItemInput>
              <ItemInput title="담당자 휴대폰 번호">
                <Box padding="14px 0">
                  <Typography>{signup.formChanger}</Typography>
                </Box>
              </ItemInput>
            </Stack>
            <Stack width="320px" gap="8px">
              <ItemInput title="가게 이름" require>
                <WPharmcyNameTextField
                  state={signup.info.pharmacyName}
                  err={signup.infoErr.pharmacyNameErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'pharmacyName'}
                />
              </ItemInput>
              <ItemInput title="가게 주소" require>
                <WAddressSearch setAddress={signup.addressOnChange} />
              </ItemInput>
              <Box height="20px" />
              <ItemInput title="가게 상세 주소">
                <WAddressDetailTextField
                  state={signup.info.addressDetail}
                  err={signup.infoErr.addressDetailErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'addressDetail'}
                />
              </ItemInput>
              <ItemInput title="가게 전화 번호" require>
                <WPhoneTextField
                  state={signup.info.pharmacyPhone}
                  err={signup.infoErr.pharmacyPhoneErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'pharmacyPhone'}
                />
              </ItemInput>
              <ItemInput title="가게 팩스번호" require>
                <WFaxTextField
                  state={signup.info.pharmacyFaxNum}
                  err={signup.infoErr.pharmacyFaxNumErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'pharmacyFaxNum'}
                />
              </ItemInput>
              <ItemInput title="사업자 등록 번호" require>
                <WBusinessNumTextField
                  state={signup.info.buisNum}
                  err={signup.infoErr.buisNumErr}
                  setState={signup.setInInfo}
                  setErr={signup.setInInfoErr}
                  keyId={'buisNum'}
                />
              </ItemInput>
            </Stack>
          </Grid>
          <Grid container width="740px" justifyContent="space-between">
            <ItemInput
              title="사업자 등록증 첨부"
              require
              sx={{ width: '220px', gap: '0px' }}
            >
              <SignupFileUpload
                name="businessLicense"
                onDeleteLogoUid={() =>
                  signup.setInInfo(undefined, 'businessLicense')
                }
                onUploadFile={(file) =>
                  signup.setInInfo(file, 'businessLicense')
                }
                placeholder="사업자 등록증 파일명"
              />
            </ItemInput>
            <ItemInput
              title="약사 면허증 첨부"
              require
              sx={{ width: '220px', gap: '0px' }}
            >
              <SignupFileUpload
                name="pharmacistLicense"
                onDeleteLogoUid={() =>
                  signup.setInInfo(undefined, 'pharmacistLicense')
                }
                onUploadFile={(file) =>
                  signup.setInInfo(file, 'pharmacistLicense')
                }
                placeholder="약사 면허증 파일명"
              />
            </ItemInput>
            <ItemInput
              title="통장사본 첨부"
              require
              sx={{ width: '220px', gap: '0px' }}
            >
              <SignupFileUpload
                name="bankbookCopy"
                onDeleteLogoUid={() =>
                  signup.setInInfo(undefined, 'bankbookCopy')
                }
                onUploadFile={(file) => signup.setInInfo(file, 'bankbookCopy')}
                placeholder="통장사본 파일명"
              />
            </ItemInput>
          </Grid>
        </Stack>
      </WAlert>
      <SigninNotApproved
        open={signup.modalOn}
        handleClose={signup.handleCloseAll}
      />
    </>
  );
};

export default SignupStepThree;
