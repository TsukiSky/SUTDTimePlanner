import {TimeStamp} from "../model/TimeStamp";

export function toTimeStamp(time: string): TimeStamp {
  let hour: string = time.split(':')[0];
  let minute: string = time.split(':')[1];
  return new TimeStamp(Number(hour), Number(minute));
}
