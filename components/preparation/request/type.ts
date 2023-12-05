export interface RequestInterface {
  ulid: string;
  status: string;
  statusNameKo: string;
  deliveryForm: string;
  deliveryFormKo: string;
  waybillNumber: string;
  courier: string;
  completionAt: string;
  treatHospitalName: string;
  treatDoctorName: string;
  treatHospitalPhone: string;
}

export interface PreparationRequestDto {
  name: string;
  mobileNumber: string;
  address: string;
}
