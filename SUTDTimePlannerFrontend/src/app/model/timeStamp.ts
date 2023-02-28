export class TimeStamp {
  minute: number = 0;
  hour: number = 0;

  constructor(minute: number, hour: number) {
    this.minute = minute;
    this.hour = hour;
  }

  gapInMinute(timeStamp: TimeStamp): number {
    let gap: number;
    if (timeStamp.hour > this.hour) {
      gap = 60 * (timeStamp.hour - (this.hour+1)) + timeStamp.minute + (60-this.minute);
    } else if (timeStamp.hour < this.hour) {
      gap = 60 * (this.hour - (timeStamp.hour+1)) + this.minute + (60-timeStamp.minute);
    } else {
      gap = Math.abs(this.minute - timeStamp.minute);
    }
    return gap;
  }
}
