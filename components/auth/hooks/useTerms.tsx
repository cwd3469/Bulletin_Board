import { useCallback, useEffect, useState } from 'react';

export default function useTerms() {
  const [agreeAll, setAll] = useState<boolean>(false);
  const [agreeTermA, setAgreeTermA] = useState<boolean>(false);
  const [agreeTermB, setAgreeTermB] = useState<boolean>(false);
  const [agreeTermC, setAgreeTermC] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const onCheckAllAgree = useCallback(() => {
    if (agreeTermA && agreeTermB && agreeTermC) {
      setAgreeTermA(false);
      setAgreeTermB(false);
      setAgreeTermC(false);
      setAll(false);
    } else {
      setAgreeTermA(true);
      setAgreeTermB(true);
      setAgreeTermC(true);
      setAll(true);
    }
  }, [agreeTermC, agreeTermA, agreeTermB]);

  const onCheckBoxA = (boo: boolean) => setAgreeTermA(!boo);
  const onCheckBoxB = (boo: boolean) => setAgreeTermB(!boo);
  const onCheckBoxC = (boo: boolean) => setAgreeTermC(!boo);

  const onClickReset = () => {
    setAgreeTermA(false);
    setAgreeTermB(false);
    setAgreeTermC(false);
    setAll(false);
  };

  useEffect(() => {
    if (agreeTermA && agreeTermB && agreeTermC) {
      setDisabled(false);
      setAll(true);
    } else {
      setDisabled(true);
      setAll(false);
    }
  }, [agreeTermC, agreeTermA, agreeTermB, setAll]);

  return {
    agreeAll,
    agreeTermA,
    agreeTermB,
    agreeTermC,
    disabled,
    onCheckBoxA,
    onCheckBoxB,
    onCheckBoxC,
    onClickReset,
    onCheckAllAgree,
  };
}
