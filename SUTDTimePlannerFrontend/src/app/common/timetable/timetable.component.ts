import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { Slot } from 'src/app/model/Slot';
import { TimeStamp } from 'src/app/model/TimeStamp';
import { isOverlapped, toTimeStamp } from "../../utils/Utils";
import {Class} from "../../model/Class";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  // static information
  times: string[] = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
  dates: string[] = ["MON", "TUE", "WED", "THU", "FRI"];
  startTimeStamp: TimeStamp = new TimeStamp(8, 0);

  @Input() classSet: Set<Class> = new Set();
  @Input() alternativeClasses: Map<Class, Class[]> = new Map<Class, Class[]>();
  @Output() classSetChanged = new EventEmitter<Class>();
  slotByDate: Map<string, Array<Slot[]>> = new Map();
  alteringSlots: Slot[] = [];

  constructor() {}

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
    this.classSet.forEach(clas => {
      clas.slots.forEach(slot => {
        if (this.slotByDate.has(slot.date)) {
          let rowsInOneDay: Array<Slot[]> = this.slotByDate.get(slot.date)!;
          let addNewRow: boolean = true;
          let sameCourse: boolean = false;
          for (let row of rowsInOneDay) {
            let hasOverlap = false;
            for (let embedSlot of row) {
              if (slot.courseName == embedSlot.courseName && slot.type == "lecture") {
                // same course different classes
                sameCourse = true;
                break;
              }

              if (isOverlapped(slot, embedSlot)) {
                hasOverlap = true;
                break;
              }
            }

            if (sameCourse) {
              break;
            }

            if (!hasOverlap) {
              row.push(slot);
              this.refreshRow(row);
              addNewRow = false;
              break;
            }
          }

          if (!sameCourse) {
            if (addNewRow) {
              let newRow = [slot];
              this.refreshRow(newRow);
              rowsInOneDay.push(newRow);
            }
            this.slotByDate.set(slot.date, rowsInOneDay);
          }
        } else {
          let newRow = [slot];
          this.refreshRow(newRow);
          this.slotByDate.set(slot.date, new Array<Slot[]>([slot]));
        }
      });
    });
  }

  isAltering(slot: Slot) {
    for (const classes of this.alternativeClasses.values()) {
      for (const clas of classes) {
        for (const slt of clas.slots) {
          if (slt.slotId == slot.slotId) {
            return true;
          }
        }
      }
    }
    return false;
  }

  ngOnInit() {
    // this.refreshTimetable();
  }

  onSlotClick(slot: Slot) {
    if (this.isAltering(slot)) {
      // change slots
      let newClass: Class;
      let newAlterClasses: Class[];
      let classToDelete: Class[] = [];

      for (const clas of this.alternativeClasses.keys()) {
        for (const targetClass of this.alternativeClasses.get(clas)!) {
          if (targetClass.slots.includes(slot)) {
            newClass = targetClass;
            newAlterClasses = this.alternativeClasses.get(clas)!;
            newAlterClasses = newAlterClasses.filter(element => element.classId != targetClass.classId);
            newAlterClasses.push(clas);
            classToDelete = newAlterClasses;
            break;
          }
        }
      }
      for (const clas of classToDelete) {
        this.alternativeClasses.delete(clas);
        this.classSet.delete(clas);
      }
      this.alternativeClasses = this.alternativeClasses.set(newClass!, newAlterClasses!);
      this.classSet = this.classSet.add(newClass!);
      this.classSetChanged.emit(newClass!);
      this.alteringSlots = this.alteringSlots.filter(element => element.slotId != slot.slotId);
    } else {
      if (this.alteringSlots.indexOf(slot) != -1) {
        // stop altering
        let classToDelete: Class[] = [];

        this.alteringSlots = this.alteringSlots.filter(element => element.slotId != slot.slotId);
        for (const clas of this.alternativeClasses.keys()) {
          if (clas.courseName == slot.courseName) {
            classToDelete = this.alternativeClasses.get(clas)!;
            break;
          }
        }
        for (const clas of classToDelete) {
          this.classSet.delete(clas);
        }
      } else {
        // start altering
        this.alteringSlots.push(slot);

        for (const clas of this.alternativeClasses.keys()) {
          let courseName = clas.courseName;
          if (slot.courseName == courseName && slot.type == "Class") {
            for (const alterClas of this.alternativeClasses.get(clas)!) {
              this.classSet = this.classSet.add(alterClas);
            }
            break;
          }
        }
      }
    }
    this.refreshTimetable();
  }

  isAlterable(slot: Slot): boolean {
    if (slot.type != "Class" && slot.type != "tutorial") {
      return false;
    } else {
      for (const clas of this.alternativeClasses.keys()) {
        if (clas.courseName == slot.courseName) {
          return true;
        }
      }
      return false;
    }
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    let change: SimpleChange = changes['classSet'];
    this.classSet = change.currentValue;
    this.refreshTimetable();
  }

  protected readonly toTimeStamp = toTimeStamp;
}
