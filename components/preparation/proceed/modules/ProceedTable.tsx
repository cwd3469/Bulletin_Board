import React, { useCallback, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { ProceedInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import GridButton from '@components/common/button/modules/GridButton';
import {
  CheckIcon,
  UserIcon,
  CheckIconGray,
  PencilIcon,
} from '@components/common/dataDisplay/WIcons';
import RequesterModal from '@components/preparation/modals/RequesterModal';
import { transDeliveryMethod, transMedicineStatus } from '@utils/transtext';
import WDayTimeTypography from '@components/common/typography/WDayTimeTypography';
import { ReceiveData } from '@components/preparation/request/modules/RequestTable';
import DispensingExpensesModal from '@components/preparation/modals/DispensingExpensesModal';
import usePrescriptionPreview from '@hooks/utils/fileUpload/usePrescriptionPreview';
import { apiProceedPrescription } from '@hooks/apis/preparation/proceed';
import PrescriptionPreviewView from '@components/preparation/modals/PrescriptionPreviewView';
import useMutateDispensingExpenses from '@hooks/apis/preparation/proceed/hooks/useMutateDispensingExpenses';
import { useDebounceFn } from 'ahooks';
import PreparationCompletedModal from '@components/preparation/modals/PreparationCompletedModal';

export interface PrescriptionId {
  prescriptionUlid: string;
  medicineOrderUlid: string;
}
export interface PatientInfo {
  patientName: string;
  requestDate: string;
}
export interface StateChangeType {
  medicineOrderUlid: string;
  open: boolean;
}

const ProceedTable = (props: { data: ProceedInterface[] }): JSX.Element => {
  const { data } = props;
  const [stateCompleted, setStateCompleted] = useState<StateChangeType>();
  const [receiveData, setReceiveData] = useState<ReceiveData>();
  const [requesterOpen, setRequesterOpen] = useState<boolean>(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState<boolean>(false);
  const [dispensingExpensesOpen, setDispensingExpensesOpen] =
    useState<boolean>(false);
  const [patientInfo, setPatientInfo] = useState<string>('');
  const [medicineCost, setMedicineCost] = useState<number>(0);
  const [userUlid, setUserUlid] = useState<PrescriptionId>({
    prescriptionUlid: '',
    medicineOrderUlid: '',
  });

  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });

  /**ProceedTable 요청자 정보 */
  const requesterOnOff = useCallback((open: boolean, data?: ReceiveData) => {
    setReceiveData(data);
    setRequesterOpen(open);
  }, []);

  /**ProceedTable 처방전 보기 */
  const userUlidOnOff = useCallback(
    (params: {
      prescriptionUlid: string;
      medicineOrderUlid: string;
      patientInfo: string;
      open: boolean;
    }) => {
      setUserUlid({
        prescriptionUlid: params.prescriptionUlid,
        medicineOrderUlid: params.medicineOrderUlid,
      });
      setPatientInfo(params.patientInfo);
      setPrescriptionOpen(params.open);
    },
    [],
  );
  /**ProceedTable 조제비 수정 */
  const coastModifiOnOff = useCallback(
    (medicineOrderUlid: string, medicineCost: number, open: boolean) => {
      setUserUlid({ prescriptionUlid: '', medicineOrderUlid });
      setMedicineCost(medicineCost);
      setDispensingExpensesOpen(open);
    },
    [],
  );

  const columns: GridColDef[] = [
    {
      ...baseOption,
      field: 'medicineStatus',
      headerName: '상태',
      width: 80,
      renderCell: (params) => {
        return (
          <span
            style={{
              color:
                params.row.medicineStatus === 'OUTSTANDING'
                  ? '#fc5935'
                  : '#555',
            }}
          >
            {transMedicineStatus(params.row.medicineStatus)}
          </span>
        );
      },
    },
    {
      ...baseOption,
      field: 'requestDateTime',
      headerName: '조제 수락 시간',
      width: 135,
      renderCell: (params) => {
        return <WDayTimeTypography date={params.row.requestDateTime} />;
      },
    },
    {
      ...baseOption,
      field: 'deliveryMethod',
      headerName: '수령 방법',
      width: 80,
      renderCell: (params) => {
        return <>{transDeliveryMethod(params.row.deliveryMethod)}</>;
      },
    },

    {
      ...baseOption,
      field: 'requesterInfo',
      headerName: '요청자 정보',
      width: 130,
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
      width: 180,
    },
    {
      ...baseOption,
      field: 'doctorNameKo',
      headerName: '진료 병원 의사 명',
      width: 110,
    },
    {
      ...baseOption,
      field: 'hospitalPhoneNum',
      headerName: '병원 연락처',
      width: 105,
    },
    {
      ...baseOption,
      field: 'prescriptionPreview',
      headerName: '처방전 보기',
      width: 125,
      renderCell: (prams) => {
        const {
          prescriptionUlid,
          medicineOrderUlid,
          requestDateTime,
          receiveData,
        } = prams.row;
        return (
          <GridButton
            onClick={() =>
              userUlidOnOff({
                prescriptionUlid: prescriptionUlid,
                medicineOrderUlid: medicineOrderUlid,
                patientInfo: `${receiveData.receiveNameKo}_${requestDateTime}`,
                open: true,
              })
            }
            startIcon={<CheckIcon />}
          >
            처방전 보기
          </GridButton>
        );
      },
    },
    {
      ...baseOption,
      field: 'billingExpenses',
      headerName: '청구 조제비',
      width: 125,
      renderCell: (prams) => {
        const { medicineOrderUlid, medicineCost } = prams.row;
        return (
          <GridButton
            onClick={() =>
              coastModifiOnOff(medicineOrderUlid, medicineCost, true)
            }
            startIcon={<PencilIcon />}
          >
            조제비 수정
          </GridButton>
        );
      },
    },
    {
      ...baseOption,
      field: 'preparationCompleted',
      headerName: '조제 완료',
      width: 125,
      renderCell: (prams) => {
        const { medicineOrderUlid, medicineStatus } = prams.row;
        return (
          <GridButton
            onClick={() =>
              setStateCompleted({
                medicineOrderUlid: medicineOrderUlid,
                open: true,
              })
            }
            startIcon={<CheckIconGray />}
            disabled={medicineStatus === 'OUTSTANDING' ? true : false}
          >
            조제 완료
          </GridButton>
        );
      },
    },
  ];

  /**PrescriptionPreviewModal 처방전 미리보기 기능 */
  const { fileArr, imageUrl, reset } = usePrescriptionPreview({
    medicineOrderUlid: userUlid.medicineOrderUlid,
    prescriptionUlid: userUlid.prescriptionUlid,
    handleClose: () =>
      userUlidOnOff({
        prescriptionUlid: '',
        medicineOrderUlid: '',
        patientInfo: '',
        open: false,
      }),
    apiFileBase: apiProceedPrescription,
  });

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
      <PreparationCompletedModal
        open={stateCompleted ? stateCompleted.open : false}
        medicineOrderUlid={
          stateCompleted ? stateCompleted.medicineOrderUlid : undefined
        }
        handleClose={() => setStateCompleted(undefined)}
      />

      {/* 처방전 보기 */}
      <PrescriptionPreviewView
        open={prescriptionOpen}
        fileArr={fileArr}
        imageUrl={imageUrl}
        reset={reset}
        patientInfo={patientInfo}
      />

      {/* 조제비 수정 */}
      <DispensingExpensesModal
        id={userUlid.medicineOrderUlid}
        medicineCost={medicineCost}
        open={dispensingExpensesOpen}
        handleClose={() => coastModifiOnOff('', 0, false)}
      />
    </>
  );
};

export default ProceedTable;
