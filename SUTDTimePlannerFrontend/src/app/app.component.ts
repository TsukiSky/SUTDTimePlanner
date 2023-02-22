import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Course } from './model/Course';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  termList = [1,2,3,4,5,6,7,8];
  pillarList = ["ASD", "CSD", "DAI", "EPD", "ESD", "HASS"]

  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private message: NzMessageService) {}

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
    slots: [{
      subject: "Science for a Sustainable World",
      slots: [{type:"T1", startTime:"THU08", endTime: "THU10"}, {type:"T2", startTime:"FRI15", endTime: "FRI16"}]
    },]
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
    slots: [{
      subject: "Information Systems and Programming",
      slots: [{type:"T1", startTime:"MON08", endTime: "MON10"}, {type:"lab1", startTime:"FRI12", endTime: "FRI14"}]
    }]
  }
  courseList: Course[] = [this.courseA, this.courseB, this.courseC];
  subjectList: string[] = [];

  expandCourseSet = new Set<number>();
  enrolledCourseSet = new Set<Course>();

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [""],
      searchPillar: [""],
      searchName: [""],
    });

    for (let i of this.courseList) {
      this.subjectList.push(i.subject);
    }

    // for testing purpose
    this.enrolledCourseSet.add(this.courseA);
    this.enrolledCourseSet.add(this.courseB);
  }

  onCourseExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandCourseSet.add(id);
    }else {
      this.expandCourseSet.delete(id);
    }
    Array.from
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  enrollCourse(selectedCourse: Course): void {

    this.enrolledCourseSet = this.enrolledCourseSet.add(selectedCourse);
    this.message.success(`Enroll in Course: ${selectedCourse.subject}`);
  }

  dropCourse(id: number, subject: string): void {
    this.message.info(`Drop Course: ${subject}`);
    this.enrolledCourseSet.forEach(course => {
      if (course.id == id) {
        this.enrolledCourseSet.delete(course);
      }
    });
  }
}
