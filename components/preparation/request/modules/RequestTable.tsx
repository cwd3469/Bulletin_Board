import React, { useCallback, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { RequestInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import GridButton from '@components/common/button/modules/GridButton';
import { CheckIcon, UserIcon } from '@components/common/dataDisplay/WIcons';
import RequesterModal from '@components/preparation/modals/RequesterModal';
import DispensingAccepModal from '@components/preparation/modals/DispensingAccepModal';
import { mobileFormat, phoneFormat } from '@utils/formatNumber';
import { transDeliveryMethod, transMedicineStatus } from '@utils/transtext';
import WDayTimeTypography from '@components/common/typography/WDayTimeTypography';
import pencilAlt from 'public/assets/icon/pencil-alt.svg';
import Image from 'next/image';

export interface ReceiveData {
  receiveAddrDetailKo: string;
  receiveAddrKo: string;
  receiveNameKo: string;
  receivePhoneNum: string;
  receiveZipCode: string;
}

const RequestTable = (props: { data: RequestInterface[] }): JSX.Element => {
  const { data } = props;
  const [receiveData, setReceiveData] = useState<ReceiveData>();
  const [requesterOpen, setRequesterOpen] = useState<boolean>(false);
  const [prescriptionId, setPrescriptionId] = useState<string>('');
  const [medicineOrderUlid, setMedicineOrderUlid] = useState<string>('');
  const [prescriptionOpen, setPrescriptionOpen] = useState<boolean>(false);
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });

  const requesterOnOff = useCallback((open: boolean, data?: ReceiveData) => {
    setReceiveData(data);
    setRequesterOpen(open);
  }, []);

  const prescriptionIdOnOff = useCallback(
    (prescriptionId: string, medicineOrderUlid: string, open: boolean) => {
      setPrescriptionId(prescriptionId);
      setMedicineOrderUlid(medicineOrderUlid);
      setPrescriptionOpen(open);
    },
    [],
  );

  const columns: GridColDef[] = [
    {
      ...baseOption,
      field: 'medicineStatus',
      headerName: '상태',
      width: 92,
      renderCell: (params) => {
        const state = transMedicineStatus(params.row.medicineStatus);
        return <>{state}</>;
      },
    },
    {
      ...baseOption,
      field: 'requestDateTime',
      headerName: '조제 요청 시간',
      width: 180,
      renderCell: (params) => {
        return <WDayTimeTypography date={params.row.requestDateTime} />;
      },
    },
    {
      ...baseOption,
      field: 'deliveryMethod',
      headerName: '수령 방법',
      width: 100,
      renderCell: (params) => {
        const state = transDeliveryMethod(params.row.deliveryMethod as string);
        return <>{state}</>;
      },
    },

    {
      ...baseOption,
      field: 'requesterInfo',
      headerName: '요청자 정보',
      width: 150,
      renderCell: (prams) => {
        const { deliveryMethod, medicineStatus, receiveData } = prams.row;
        return (
          <GridButton
            onClick={() => {
              requesterOnOff(true, receiveData);
            }}
            startIcon={<UserIcon />}
            disabled={
              medicineStatus === 'CANCEL'
                ? true
                : deliveryMethod === 'COMPLETION'
                ? true
                : false
            }
          >
            요청자 정보
          </GridButton>
        );
      },
    },
    {
      ...baseOption,
      field: 'hospitalNameKo',
      headerName: '진료 병원 명',
      width: 240,
    },
    {
      ...baseOption,
      field: 'doctorNameKo',
      headerName: '진료 병원 의사 명',
      width: 120,
    },
    {
      ...baseOption,
      field: 'hospitalPhoneNum',
      headerName: '병원 연락처',
      width: 150,
      renderCell: (prams) => {
        const num = prams.row.hospitalPhoneNum as string;
        return <>{phoneFormat(num)}</>;
      },
    },
    {
      ...baseOption,
      field: 'prescriptionPreview',
      headerName: '조제 수락 / 거절',
      width: 160,
      renderCell: (prams) => {
        const { prescriptionUlid, medicineOrderUlid } = prams.row;
        return (
          <GridButton
            onClick={() =>
              prescriptionIdOnOff(prescriptionUlid, medicineOrderUlid, true)
            }
            startIcon={<Image src={pencilAlt} alt="작성" />}
          >
            조제 수락 / 거절
          </GridButton>
        );
      },
    },
  ];

  return (
    <>
      <WDataTable rows={rows} columns={columns} />
      {/* 요청자 정보 */}
      {receiveData ? (
        <RequesterModal
          receiveData={receiveData}
          open={requesterOpen}
          handleClose={() => requesterOnOff(false, undefined)}
        />
      ) : (
        ''
      )}
      {/* 조제 수락 보기 */}
      <DispensingAccepModal
        medicineOrderUlid={medicineOrderUlid}
        prescriptionUlid={prescriptionId}
        open={prescriptionOpen}
        handleClose={() => prescriptionIdOnOff('', '', false)}
      />
    </>
  );
};

export default RequestTable;
