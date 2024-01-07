import {TimeStamp} from "../model/TimeStamp";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {HttpParams} from "@angular/common/http";
import {Slot} from "../model/Slot";
import html2canvas from "html2canvas";
import { environment } from "src/environments/environment";

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

function preprocessImage(element: HTMLElement, aspectRatio: number) {
  const height = 1800;
  const width = height * aspectRatio;
  element.style.width = width + 'px';
  element.style.height = height + 'px';
  element.style.fontSize = '36px';
  const rows = element.querySelectorAll(".row");
  rows.forEach(row => {
    const rowHTMLElement = row as HTMLElement;
    rowHTMLElement.style.minHeight = '280px';
  });

  const courseBoxes = element.querySelectorAll(".course-box");
  courseBoxes.forEach(box => {
    const boxHTMLElement = box as HTMLElement;
    boxHTMLElement.style.minHeight = '136px';
  });
}

export function downloadImage(elementId: string, format: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const clonedElement = element.cloneNode(true) as HTMLElement;
    let aspectRatio = 1;
    if (format == "16:9") {
      aspectRatio = 16 / 9;
    } else if (format == "2048×1080") {
      aspectRatio = 2048 / 1080;
    }

    preprocessImage(clonedElement, aspectRatio);

    document.body.appendChild(clonedElement);
    html2canvas(clonedElement).then(canvas => {
      const dataURL = canvas.toDataURL('image/png');

      // Create a link element
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `${elementId}.png`;
      link.click();
      clonedElement.remove();
    })
  }
}

export function storeData(name: string, ids: any) {
    const dataArray = JSON.stringify(ids);
    localStorage.setItem(name, dataArray);
}

export async function getData(itemName: string, username: string) {
  let data;
  // try {
  //   data = JSON.parse(localStorage.getItem(itemName) == null? "": localStorage.getItem(itemName)!);
  // } catch (e) {
  //   data = "";
  // }

  if (itemName == "starredCourseSet") {
    let response = await fetch(`${environment.apiUrl}/user/get_star_course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username
        })
    })
    data = await response.json()
  } else if (itemName == "enrolledCourseSet") {
    let response = await fetch(`${environment.apiUrl}/user/get_enrol_course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username
        })
    })
    data = await response.json()
  }
  return data;
}

export function clearData() {
  localStorage.clear();
}
