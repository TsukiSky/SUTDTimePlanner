import { TimeStamp } from "./timeStamp";

export class Slot {
  subject: string = "";
  type: string = "";
  date: string = "";
  startTime: TimeStamp = new TimeStamp(0, 0);
  endTime: TimeStamp = new TimeStamp(0, 0);
  offset: number = 0;

  hasOverlap(slot: Slot): boolean {
    let zeroTime: TimeStamp = new TimeStamp(0, 0);
    return (this.startTime.gapInMinute(zeroTime) <= slot.endTime.gapInMinute(zeroTime) && this.endTime.gapInMinute(zeroTime) >= slot.startTime.gapInMinute(zeroTime))
      || (slot.startTime.gapInMinute(zeroTime) <= this.endTime.gapInMinute(zeroTime) && slot.endTime.gapInMinute(zeroTime) >= this.startTime.gapInMinute(zeroTime))
  }
}
