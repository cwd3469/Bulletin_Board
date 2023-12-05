export interface WeekendDto {
  openTime: string;
  closeTime: string;
  hasOperation: boolean;
}
export interface WeekDataBundle {
  [key: string]: WeekendDto | string | undefined;
  mondayOperation: WeekendDto;
  tuesdayOperation: WeekendDto;
  wednesdayOperation: WeekendDto;
  thursdayOperation: WeekendDto;
  fridayOperation: WeekendDto;
  saturdayOperation: WeekendDto;
  sundayOperation: WeekendDto;
  holidayOperation: WeekendDto;
}
export interface WeekDataBundlePharmacy extends WeekDataBundle {
  pharmacyUlid?: string;
  pharmacistMobileNum1: string;
  pharmacistMobileNum2: string;
  pharmacistMobileNum3: string;
}
