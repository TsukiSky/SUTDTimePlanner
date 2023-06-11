import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { range } from 'rxjs';
import { Course } from 'src/app/model/Course';
import { Slot } from 'src/app/model/Slot';
import { TimeStamp } from 'src/app/model/TimeStamp';
import {toTimeStamp} from "../../utils/Utils";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  // static information
  times: string[] = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
  timesM: string[] = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  dates: string[] = ["MON", "TUE", "WED", "THU", "FRI"];
  startTimeStamp: TimeStamp = new TimeStamp(8, 0);

  @Input() courseSet: Set<Course> = new Set();
  courseSetCopy = this.courseSet;
  colorMap: Map<number, string> = new Map();
  slotByDate: Map<string, Set<Slot[]>> = new Map();

  constructor(public sanitizer: DomSanitizer) { }

  refreshRow(row: Slot[]):void {
    row.sort((a: Slot, b: Slot) => {return toTimeStamp(a.endTime).gapInMinute(this.startTimeStamp) - toTimeStamp(b.startTime).gapInMinute(this.startTimeStamp)});
    let cumulativeOffset = 0;
    for(let i=0; i<row.length; i++) {
      if (i == 0) {
        row[i].offset = 22*(toTimeStamp(row[i].startTime).gapInMinute(this.startTimeStamp)/660);
      } else {
        row[i].offset = 22*(toTimeStamp(row[i].startTime).gapInMinute(this.startTimeStamp)/660)-cumulativeOffset;
      }
      cumulativeOffset += row[i].offset + 22*(toTimeStamp(row[i].endTime).gapInMinute(toTimeStamp(row[i].startTime))/660);
    }
  }

  refreshTimetable() {
    this.slotByDate = new Map();
    this.courseSetCopy = this.courseSet;
    this.courseSetCopy.forEach(course => {
      this.colorMap = this.colorMap.set(course.courseId, "#080192");
      course.classes.forEach(clas => {
        clas.slots.forEach(
          slot => {
            if (this.slotByDate.has(slot.date)) {
              let rowsInOneDay: Set<Slot[]> = this.slotByDate.get(slot.date)!;
              let addNewRow: boolean = true;
              for (let row of rowsInOneDay) {
                let hasOverlap = false;
                for (let embedSlot of row) {
                  if (slot.hasOverlap(embedSlot)) {
                    hasOverlap = true;
                    break;
                  }
                }
                if (!hasOverlap) {
                  row.push(slot);
                  this.refreshRow(row);
                  addNewRow = false;
                  break;
                }
              }
              if (addNewRow) {
                let newRow = [slot];
                this.refreshRow(newRow);
                rowsInOneDay = rowsInOneDay.add(newRow);
              }
              this.slotByDate.set(slot.date, rowsInOneDay);
            } else {
              this.slotByDate.set(slot.date, new Set<Slot[]>([[slot]]));
            }
          })
      })
    })
    console.log(this.colorMap);
  }

  ngOnInit() {
    // this.refreshTimetable();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    let change: SimpleChange = changes['courseSet'];
    this.courseSet = change.currentValue;
    this.refreshTimetable();
  }

  protected readonly toTimeStamp = toTimeStamp;
}
