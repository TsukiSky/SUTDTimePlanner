import {TimeStamp} from "../model/TimeStamp";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {HttpParams} from "@angular/common/http";
import {Slot} from "../model/Slot";
import html2canvas from "html2canvas";

export function toTimeStamp(time: string): TimeStamp {
  let hour: string = time.split(':')[0];
  let minute: string = time.split(':')[1];
  return new TimeStamp(Number(hour), Number(minute));
}

export function createTableQueryHttpParam(tableQueryParams: NzTableQueryParams, criteria?: {}) {
  const { pageIndex, pageSize, sort, filter } = tableQueryParams;

  let params = new HttpParams();
  params = pageIndex ? params.append('page', `${pageIndex}`): params;
  params = pageSize ? params.append('size', `${pageSize}`): params;
  filter?.filter(item => item.value !== null)
    .forEach(item => {
      params = params.append(item.key, item.value);
    });
  if (criteria) {
    Object.entries(criteria)?.filter(([key, value]) => value !== null)
      .forEach(([key, value]) => {
        params = params.append(key, value as any);
      });
  }

  return params;
}

export function isOverlapped(slotA: Slot, slotB: Slot) {
  if (slotA.date != slotB.date) {
    return false;
  }

  let slotAStartHour = Number(slotA.startTime.split(':')[0]);
  let slotAStartMinute = Number(slotA.startTime.split(':')[1]);
  let slotAEndHour = Number(slotA.endTime.split(':')[0]);
  let slotAEndMinute = Number(slotA.endTime.split(':')[1]);

  let slotAStartTime = new TimeStamp(slotAStartHour, slotAStartMinute);
  let slotAEndTime = new TimeStamp(slotAEndHour, slotAEndMinute);

  let slotBStartHour = Number(slotB.startTime.split(':')[0]);
  let slotBStartMinute = Number(slotB.startTime.split(':')[1]);
  let slotBEndHour = Number(slotB.endTime.split(':')[0]);
  let slotBEndMinute = Number(slotB.endTime.split(':')[1]);

  let slotBStartTime = new TimeStamp(slotBStartHour, slotBStartMinute);
  let slotBEndTime = new TimeStamp(slotBEndHour, slotBEndMinute);


  let zeroTime: TimeStamp = new TimeStamp(0, 0);
  return (slotAStartTime.gapInMinute(zeroTime) <= slotBEndTime.gapInMinute(zeroTime) && slotAEndTime.gapInMinute(zeroTime) >= slotBStartTime.gapInMinute(zeroTime))
    || (slotBStartTime.gapInMinute(zeroTime) <= slotAEndTime.gapInMinute(zeroTime) && slotBEndTime.gapInMinute(zeroTime) >= slotAStartTime.gapInMinute(zeroTime))
}

export function downloadImage(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    html2canvas(element).then(canvas => {
      const dataURL = canvas.toDataURL('image/png');

      // Create a link element
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `${elementId}.png`;
      link.click();
    })
  }
}

