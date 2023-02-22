import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/model/Course';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  headers: string[] = ["Time", "MON", "TUE", "WED", "THU", "FRI"];
  timeSlot: string[] = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"]

  rows: {[key: string]: any}[] = [
    {"Time": "08:00"},
    {"Time": "09:00"},
    {"Time": "10:00"},
    {"Time": "11:00"},
    {"Time": "12:00"},
    {"Time": "13:00"},
    {"Time": "14:00"},
    {"Time": "15:00"},
    {"Time": "16:00"},
    {"Time": "17:00"},
    {"Time": "18:00"},
    {"Time": "19:00"}
  ]

  @Input() courseSet: Set<Course> = new Set();

  constructor() { }

  ngOnInit() {
    console.log(this.courseSet);
  }
}
