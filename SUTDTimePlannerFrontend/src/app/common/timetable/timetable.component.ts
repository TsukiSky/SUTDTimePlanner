import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  headers: string[] = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  rowers: string[] = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

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
    {"Time": "19:00"},
    {"Time": "20:00"}
  ]
  constructor() { }

  ngOnInit() {
  }

}
