import { TimeStamp } from "./TimeStamp";

export class Slot {
  // subject: string = "";
  // type: string = "";
  // date: string = "";
  // courseId: number = 0;
  // startTime: TimeStamp = new TimeStamp(0, 0);
  // endTime: TimeStamp = new TimeStamp(0, 0);
  // offset: number = 0;

  slotId: number = 0;
  type: string = "";
  date: string = "";
  startTime: string = "";
  endTime: string = "";
  offset: number = 0;

  hasOverlap(slot: Slot): boolean {
    let thisStartHour = Number(this.startTime.split(':')[0]);
    let thisStartMinute = Number(this.startTime.split(':')[1]);
    let thisEndHour = Number(this.endTime.split(':')[0]);
    let thisEndMinute = Number(this.endTime.split(':')[1]);

    let thisStartTime = new TimeStamp(thisStartHour, thisStartMinute);
    let thisEndTime = new TimeStamp(thisEndHour, thisEndMinute);

    let slotStartHour = Number(slot.startTime.split(':')[0]);
    let slotStartMinute = Number(slot.startTime.split(':')[1]);
    let slotEndHour = Number(slot.endTime.split(':')[0]);
    let slotEndMinute = Number(slot.endTime.split(':')[1]);

    let slotStartTime = new TimeStamp(slotStartHour, slotStartMinute);
    let slotEndTime = new TimeStamp(slotEndHour, slotEndMinute);


    let zeroTime: TimeStamp = new TimeStamp(0, 0);
    return (thisStartTime.gapInMinute(zeroTime) <= slotEndTime.gapInMinute(zeroTime) && thisEndTime.gapInMinute(zeroTime) >= slotStartTime.gapInMinute(zeroTime))
      || (slotStartTime.gapInMinute(zeroTime) <= thisEndTime.gapInMinute(zeroTime) && slotEndTime.gapInMinute(zeroTime) >= thisStartTime.gapInMinute(zeroTime))
  }
}
