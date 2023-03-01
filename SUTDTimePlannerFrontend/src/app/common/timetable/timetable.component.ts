import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Course } from 'src/app/model/Course';
import { Slot } from 'src/app/model/Slot';
import { TimeStamp } from 'src/app/model/timeStamp';

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
  // timeSlot: string[] = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
  // courseList = ["<div class='test' style='background-color: #123; width:12px; height: 13px'></div>"];

  @Input() courseSet: Set<Course> = new Set();
  slotByDate: Map<string, Set<Slot>> = new Map();

  constructor(public sanitizer: DomSanitizer) {
    console.log(22*this.startTimeStamp.gapInMinute(new TimeStamp(10, 0))/660)
  }

  ngOnInit() {
    // construct slot set classified by date
    this.courseSet.forEach(course => {
      course.slots.forEach(slot => {
        if (this.slotByDate.has(slot.date)) {
          this.slotByDate.set(slot.date, this.slotByDate.get(slot.date)!.add(slot));
        } else {
          this.slotByDate.set(slot.date, new Set([slot]));
        }
      });
    });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    let change: SimpleChange = changes['courseSet'];
    this.courseSet = change.currentValue;

    // refresh slotByDate
    this.slotByDate = new Map();
    this.courseSet.forEach(course => {
      course.slots.forEach(slot => {
        if (this.slotByDate.has(slot.date)) {
          this.slotByDate.set(slot.date, this.slotByDate.get(slot.date)!.add(slot));
        } else {
          this.slotByDate.set(slot.date, new Set([slot]));
        }
      });
    });
  }
}
