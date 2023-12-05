import usePrepareReceptionChange from '@hooks/apis/preparation/request/hooks/usePrepareReceptionChange';
import React, { useEffect, useState } from 'react';
import { ModalType } from '../types';
import GnbTreatStateView from './GnbTreatStateView';

interface GnbTreatStateMobalType extends ModalType {
  status: boolean;
}

const GnbTreatStateModal = (props: GnbTreatStateMobalType) => {
  const {
    onClickPrepareReceptionStatusClose,
    onClickPrepareReceptionStatusOpen,
  } = usePrepareReceptionChange({ handleClose: props.handleClose });
  const [state, setState] = useState<boolean>(false);
  useEffect(() => {
    setState(props.status);
  }, [props.status]);

  return (
    <GnbTreatStateView
      open={props.open}
      status={state}
      handleClose={props.handleClose}
      onClickExtensionOpen={onClickPrepareReceptionStatusOpen}
      onClickExtensionClose={onClickPrepareReceptionStatusClose}
    />
  );
};

export default GnbTreatStateModal;
