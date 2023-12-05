export interface ProceedInterface {
  deliveryMethod: string;
  doctorNameKo: string;
  hospitalNameKo: string;
  hospitalPhoneNum: string;
  medicineCost: number;
  medicineOrderUlid: string;
  medicineStatus: string;
  prescriptionUlid: string;
  receiveData: UserInfo;
  requestDateTime: string;
}

interface UserInfo {
  receiveNameKo: string;
  receivePhoneNum: string;
  receiveZipCode: string;
}

export interface PreparationRequestDto {
  name: string;
  mobileNumber: string;
  address: string;
}
