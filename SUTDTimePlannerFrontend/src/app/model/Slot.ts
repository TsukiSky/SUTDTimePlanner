import { TimeStamp } from "./timeStamp";

export interface Slot {
  type: string;
  date: string;
  startTime: TimeStamp;
  endTime: TimeStamp;
}
