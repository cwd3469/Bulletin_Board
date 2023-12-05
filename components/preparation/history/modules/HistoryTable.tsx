import React, { useCallback, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { HistoryInterface } from '../type';
import WDataTable, { baseOption } from '@components/common/dataGrid/WDataTable';
import { Typography } from '@mui/material';
import { dateFormat } from '@utils/date';
import GridButton from '@components/common/button/modules/GridButton';
import {
  CheckIcon,
  TruckIcon,
  UserIcon,
} from '@components/common/dataDisplay/WIcons';
import RequesterModal from '@components/preparation/modals/RequesterModal';
import DeliveryRequestModal, {
  DeliveryState,
} from '@components/preparation/modals/DeliveryRequestModal';
import {
  transDeliveryMethod,
  transDeliveryStatus,
  transMedicineStatus,
} from '@utils/transtext';
import { ReceiveData } from '@components/preparation/request/modules/RequestTable';
import usePrescriptionPreview from '@hooks/utils/fileUpload/usePrescriptionPreview';
import { PrescriptionId } from '@components/preparation/proceed/modules/ProceedTable';
import { apiHistoryPrescription } from '@hooks/apis/preparation/history';
import PrescriptionPreviewView from '@components/preparation/modals/PrescriptionPreviewView';
import DispensingModal from '@components/preparation/modals/DispensingModal';

type DeliveryPayment = {
  approvedAt: string;
  cardCompanyNameKo: string;
  cost: number;
  paymentStatus: string;
};

const HistoryTable = (props: { data: HistoryInterface[] }): JSX.Element => {
  const { data } = props;
  /**HistoryTable 상태 */

  const [requesterOpen, setRequesterOpen] = useState<boolean>(false);
  const [deliveryOpen, setDeliveryOpen] = useState<boolean>(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState<boolean>(false);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryState>('');
  const [deliveryId, setDeliveryId] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState<string>('');
  const [receiveData, setReceiveData] = useState<ReceiveData>();
  const [userUlid, setUserUlid] = useState<PrescriptionId>({
    prescriptionUlid: '',
    medicineOrderUlid: '',
  });

  /**HistoryTable 테이블 데이터 id 추가 */
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });

  /**HistoryTable 요청자 정보 추가  */
  const requesterOnOff = useCallback((open: boolean, info?: ReceiveData) => {
    setReceiveData(info);
    setRequesterOpen(open);
  }, []);
  /**HistoryTable 처방전 ulid 추가 */
  const prescriptionIdOnOff = useCallback(
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
      setPrescriptionOpen(params.open);
      setPatientInfo(params.patientInfo);
    },
    [],
  );

  /**HistoryTable 배송 요청 기능 추가*/
  const deliveryIdOnOff = useCallback(
    (id: string, open: boolean, mode: DeliveryState) => {
      setDeliveryId(id);
      setDeliveryOpen(open);
      setDeliveryMode(mode);
    },
    [],
  );

  /**HistoryTable 테이블 데이터*/
  const columns: GridColDef[] = [
    {
      ...baseOption,
      field: 'medicineStatus',
      headerName: '상태',
      width: 70,
      renderCell: (params) => {
        return <>{transMedicineStatus(params.row.medicineStatus)}</>;
      },
    },
    {
      ...baseOption,
      field: 'requestDateTime',
      headerName: '조제 완료 시간',
      width: 120,
      renderCell: (params) => {
        const { dayTime } = dateFormat(params.row.requestDateTime);
        return <>{dayTime}</>;
      },
    },
    {
      ...baseOption,
      field: 'refuseReason',
      headerName: '거절 사유',
      width: 120,
      renderCell: (params) => {
        return (
          <Typography textAlign="center">
            {params.row.refuseReason ? params.row.refuseReason : '-'}
          </Typography>
        );
      },
    },
    {
      ...baseOption,
      field: 'deliveryMethod',
      headerName: '수령 방법',
      width: 70,
      renderCell: (params) => {
        return <>{transDeliveryMethod(params.row.deliveryMethod)}</>;
      },
    },
    {
      ...baseOption,
      field: 'deliveryStatusKo',
      headerName: '배송 상태',
      width: 130,
      renderCell: (prams) => {
        const { deliveryStatus, medicineStatus, deliveryPayment } = prams.row;
        return (
          <>
            {medicineStatus !== 'REFUSE' ? (
              <div style={{ textAlign: 'center' }}>
                <p>{transDeliveryStatus(deliveryStatus)}</p>
                <span style={{ color: '#000' }}>
                  {deliveryStatus === 'WAITING' ||
                  deliveryStatus === 'OUTSTANDING'
                    ? deliveryPayment.paymentStatus === 'FAIL'
                      ? '(결제 실패)'
                      : '(결제 성공)'
                    : ''}
                </span>
              </div>
            ) : (
              '-'
            )}
          </>
        );
      },
    },
    {
      ...baseOption,
      field: 'receiveData',
      headerName: '요청자 정보',
      width: 120,
      renderCell: (prams) => {
        const { medicineStatus, receiveData, deliveryStatus } = prams.row;

        return (
          <GridButton
            onClick={() => requesterOnOff(true, receiveData)}
            startIcon={<UserIcon />}
            disabled={
              medicineStatus === 'REFUSE' || deliveryStatus === 'COMPLETED'
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
      headerName: ' 이름',
      width: 122,
    },
    {
      ...baseOption,
      field: 'doctorNameKo',
      headerName: '  이름',
      width: 103,
    },
    {
      ...baseOption,
      field: 'hospitalPhoneNum',
      headerName: ' 연락처',
      width: 100,
    },
    {
      ...baseOption,
      field: 'prescriptionPreview',
      headerName: '처방전 보기',
      width: 120,
      renderCell: (prams) => {
        const {
          medicineStatus,
          deliveryStatus,
          prescriptionUlid,
          medicineOrderUlid,
          receiveData,
          requestDateTime,
        } = prams.row;
        return (
          <GridButton
            onClick={() =>
              prescriptionIdOnOff({
                prescriptionUlid: prescriptionUlid,
                medicineOrderUlid: medicineOrderUlid,
                patientInfo: `${receiveData.receiveNameKo}_${requestDateTime}`,
                open: true,
              })
            }
            startIcon={<CheckIcon />}
            disabled={
              medicineStatus === 'REFUSE'
                ? true
                : deliveryStatus === 'IN_DELIVERY' ||
                  deliveryStatus === 'COMPLETED'
                ? true
                : false
            }
          >
            처방전 보기
          </GridButton>
        );
      },
    },
    {
      ...baseOption,
      field: 'shippingRequest',
      headerName: '배송 요청',
      width: 120,
      renderCell: (prams) => {
        const {
          deliveryStatus,
          medicineStatus,
          medicineOrderUlid,
          deliveryMethod,
        } = prams.row;
        return (
          <GridButton
            onClick={() =>
              deliveryIdOnOff(medicineOrderUlid, true, deliveryMethod)
            }
            startIcon={<TruckIcon />}
            disabled={
              medicineStatus === 'REFUSE'
                ? true
                : deliveryStatus === 'IN_PREPARE'
                ? false
                : true
            }
          >
            배송 요청
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
      prescriptionIdOnOff({
        prescriptionUlid: '',
        medicineOrderUlid: '',
        patientInfo: '',
        open: false,
      }),
    apiFileBase: apiHistoryPrescription,
  });

  return (
    <>
      <WDataTable rows={rows} columns={columns} />
      {/* 요청자 정보 */}
      <RequesterModal
        receiveData={receiveData}
        open={requesterOpen}
        handleClose={() => requesterOnOff(false, undefined)}
      />
      {/* 요청자 정보 */}
      <PrescriptionPreviewView
        open={prescriptionOpen}
        fileArr={fileArr}
        imageUrl={imageUrl}
        reset={reset}
        patientInfo={patientInfo}
      />
      {/* 배송 요청 */}
      <DispensingModal
        mode={deliveryMode}
        id={deliveryId}
        open={deliveryOpen}
        handleClose={() => deliveryIdOnOff('', false, '')}
      />
    </>
  );
};

export default HistoryTable;
