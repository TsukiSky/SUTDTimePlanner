import { Component, OnInit } from '@angular/core';
import { Course } from './model/Course';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { range } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  termList = [1,2,3,4,5,6,7,8];
  pillarList = ["ASD", "CSD", "DAI", "EPD", "ESD", "HASS"]

  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  // these are dummy courses only for testing purposes
  courseA: Course = {
    id: 0,
    term: 2,
    pillar: 'Freshmore',
    code: '03.007',
    subject: 'Design Thinking and Innovation',
    instructors: ["Michael", "Mohan"],
    enrolmentCategory: "Pre-enrolment only",
    isCore: true,
    preRequisites: [],
    remark: '',
    slots: []
  }
  courseB: Course = {
    id: 1,
    term: 2,
    pillar: 'Freshmore',
    code: '10.016',
    subject: 'Science for a Sustainable World',
    instructors: ["Bong Eng Ying"],
    enrolmentCategory: "Pre-enrolment only",
    isCore: true,
    preRequisites: [],
    remark: '',
    slots: []
  }
  courseC: Course = {
    id: 2,
    term: 4,
    pillar: 'ISTD',
    code: '50.001',
    subject: 'Information Systems and Programming',
    instructors: ["Norman", "Fredy"],
    enrolmentCategory: "Open",
    isCore: false,
    preRequisites: ["10.014"],
    remark: '',
    slots: []
  }
  courseList: Course[] = [this.courseA, this.courseB, this.courseC];
  subjectList: string[] = [];

  expandCourseSet = new Set<number>();

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [""],
      searchPillar: [""],
      searchName: [""],
    });

    for (let i of this.courseList) {
      this.subjectList.push(i.subject);
    }
  }

  onCourseExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandCourseSet.add(id);
    }else {
      this.expandCourseSet.delete(id);
    }
  }

  resetForm(): void {
    this.searchForm.reset();
  }
}
