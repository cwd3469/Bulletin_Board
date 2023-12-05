import { SignupInfo } from '@components/auth/signup/type';
import useCodeMsgBundle from '@hooks/utils/useCodeMsgBundle';
import { useToastContext } from '@hooks/utils/useToastContext';
import { mobileFormatOff } from '@utils/formatNumber';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { apiSignupInfo } from '.';

const useMutationSignup = (props: {
  info?: SignupInfo;
  mobileValue: string;
  handleOpenModal: () => void;
}) => {
  const { info, mobileValue, handleOpenModal } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const [signupInfo, setSignupInfo] = useState<FormData>();
  const { mutate: mutateSignupInfo } = useMutation(apiSignupInfo);

  const onClickSignup = useCallback(() => {
    if (signupInfo) {
      mutateSignupInfo(signupInfo, {
        onSuccess(data, variables, context) {
          const code = data.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'info');
            return;
          } else {
            handleOpenModal();
          }
        },
        onError(error, variables, context) {
          toast?.on(
            '회원가입에 실패 하였습니다. \n 잠시후 다시 시도해 보세요.',
            'error',
          );
        },
      });
    }
  }, [handleOpenModal, msg, mutateSignupInfo, signupInfo, toast]);
  /**회원가입 신청 이벤트 */

  useEffect(() => {
    if (info) {
      const formData = new FormData();
      formData.append('accountId', info.id as string);
      formData.append('adminEmail', info.email as string);
      formData.append('password', info.pw as string);
      formData.append('reenterPassword', info.rePw as string);
      formData.append('adminNameKo', info.name as string);
      formData.append('adminMobileNum', mobileFormatOff(mobileValue) as string);
      formData.append('pharmacyNameKo', info.pharmacyName);
      formData.append('pharmacyAddr', info.pharmacyAddress);
      formData.append('pharmacyAddrDetail', info.addressDetail);
      formData.append('pharmacyZipCode', info.postCode);
      formData.append('pharmacyFaxNum', info.pharmacyFaxNum);
      formData.append('bizRegNum', mobileFormatOff(info.buisNum));
      if (info.businessLicense) {
        formData.append('bizCertFile', info.businessLicense);
      }
      if (info.pharmacistLicense) {
        formData.append('licenseFile', info.pharmacistLicense);
      }
      if (info.bankbookCopy) {
        formData.append('passbookCopyFile', info.bankbookCopy);
      }
      if (info.pharmacyPhone) {
        formData.append(
          'pharmacyPhoneNum',
          mobileFormatOff(info.pharmacyPhone),
        );
      }

      setSignupInfo(formData);
    }
  }, [info, mobileValue, props.info]);

  return { onClickSignup };
};

export default useMutationSignup;
