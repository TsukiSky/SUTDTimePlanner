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

  // headers: string[] = ["Time", "MON", "TUE", "WED", "THU", "FRI"];
  times: string[] = ["Time", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  dates: string[] = ["MON", "TUE", "WED", "THU", "FRI"]
  // timeSlot: string[] = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
  // courseList = ["<div class='test' style='background-color: #123; width:12px; height: 13px'></div>"];

  startTimeStamp: TimeStamp = new TimeStamp(0, 8);

  @Input() courseSet: Set<Course> = new Set();
  slotByDate: Map<string, Set<Slot>> = new Map();

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log(this.courseSet);

    // construct slot set classified by date
    this.courseSet.forEach(course => {
      course.slots.forEach(slot => {
        if (this.slotByDate.has(slot.date)) {
          this.slotByDate.set(slot.date, this.slotByDate.get(slot.date)!.add(slot));
        } else {
          this.slotByDate.set(slot.date, new Set([slot]))
        }
      });
      console.log(this.slotByDate)
    });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    let change: SimpleChange = changes['courseSet'];
    this.courseSet = change.currentValue;

    this.courseSet.forEach(course => {
      course.slots.forEach(slot => {
        if (this.slotByDate.has(slot.date)) {
          this.slotByDate.set(slot.date, this.slotByDate.get(slot.date)!.add(slot));
        } else {
          this.slotByDate.set(slot.date, new Set([slot]))
        }
      });
      console.log(this.slotByDate)
    });

    // Whenever the data in the parent changes, this method gets triggered
    // You can act on the changes here. You will have both the previous
    // value and the  current value here.
}
}
