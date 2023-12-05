export interface HistoryInterface {
  ulid: string;
  status: string;
  statusNameKo: string;
  deliveryForm: string;
  deliveryFormKo: string;
  deliveryStatus: string;
  deliveryStatusKo: string;
  waybillNumber: string;
  courier: string;
  completionAt: string;
  refuseReason: string;
  treatHospitalName: string;
  treatDoctorName: string;
  treatHospitalPhone: string;
}

export interface PreparationRequestDto {
  name: string;
  mobileNumber: string;
  address: string;
}
