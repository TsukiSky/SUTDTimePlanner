import { Time } from "@angular/common";

export interface Slot {
  type: string;
  startTime: Time;
  endTime: Time;
}
