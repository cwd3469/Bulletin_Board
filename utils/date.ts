import { OptionType } from '@components/common/inputs/select';
import dayjs from 'dayjs';

export const stringToDate = (txt: string) => {
  const h = txt.substring(0, 2);
  const m = txt.substring(2, 4);
  const now = '2022-12-06';
  return dayjs(`${now} ${h}:${m}`);
};

export const dateFormat = (date: string) => {
  let dayTime = dayjs(date).format('YYYY.MM.DD. HH:mm');
  let day = dayjs(date).format('YYYY.MM.DD.');
  let time = dayjs(date).format('HH:mm');
  return { dayTime, day, time };
};

export const stringToDey = (txt: string) => {
  const day = dayjs(txt);
  return day;
};

export interface WTimeListOption extends OptionType {
  index: number;
}

/**dayToTimeListUp
 * 하루를 24시간 리스트로 반환 기능
 * 1. id 값은 json form으로 변환
 * 2. Interval 시간 간격
 * 3. startEndInterval rang list일때 시작하는 시간과 끝나는 시간 간격
 * 4. viewFormat name값에 들어갈 time format
 * 5. IdFormat id값에 들어갈 time format
 * 6. ListFormat 리스트 format 'range' | 'single';
 */
export const dayToTimeListUp = (param: {
  start: string;
  end: string;
  Interval: number;
  viewFormat?: string;
  IdFormat?: string;
  ListFormat?: 'range' | 'single';
}): WTimeListOption[] => {
  const { start, end, Interval, viewFormat, ListFormat, IdFormat } = param;
  const startDate = dayjs(`2023-04-12T${start}:00:00`);
  const endDate = dayjs(`2023-04-12T${end}:00:00`);
  const intervalMinutes = Interval;

  let timeList: WTimeListOption[] = [];
  let index = 1;
  for (
    let currentTime = startDate;
    currentTime.isBefore(endDate);
    currentTime = currentTime.add(intervalMinutes, 'minute')
  ) {
    const endInterval = intervalMinutes ? intervalMinutes : 1;
    const currentTimeEnd = currentTime.add(endInterval, 'm');
    const startName = currentTime.format(viewFormat ? viewFormat : 'HH:mm');
    const endName = currentTimeEnd.format(viewFormat ? viewFormat : 'HH:mm');

    const startId = IdFormat ? currentTime.format(IdFormat) : currentTime;
    const endId = IdFormat ? currentTimeEnd.format(IdFormat) : currentTimeEnd;

    const itemName = `${startName} ~ ${
      currentTimeEnd.format('HH:mm') === '00:00' ? '24:00' : endName
    }`;
    const itemId = JSON.stringify({
      startTime: startId,
      endTime: endId,
    });
    const rangeItem: WTimeListOption = {
      index: index,
      name: itemName,
      id: itemId,
    };
    const singleItem: WTimeListOption = {
      index: index,
      name: startName,
      id: JSON.stringify(startId),
    };
    index++;
    const item = () => {
      switch (ListFormat) {
        case 'range':
          return rangeItem;
        default:
          return singleItem;
      }
    };
    timeList.push(item());
  }

  const timeLast: WTimeListOption = {
    index: timeList.length + 1,
    name:
      endDate.format(viewFormat ? viewFormat : 'HH:mm') === '00:00'
        ? '24:00'
        : endDate.format(viewFormat ? viewFormat : 'HH:mm'),
    id: JSON.stringify(
      IdFormat
        ? endDate.format(IdFormat) === '0000'
          ? '2400'
          : endDate.format(IdFormat)
        : endDate,
    ),
  };
  const singleTimeList = [...timeList, timeLast];

  return timeList;
};
