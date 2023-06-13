import {TimeStamp} from "../model/TimeStamp";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {HttpParams} from "@angular/common/http";

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


