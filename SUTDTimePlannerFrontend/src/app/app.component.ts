import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Course } from './model/Course';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TimeStamp } from './model/timeStamp';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Slot } from './model/Slot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  // static variable
  termList = [1,2,3,4,5,6,7,8];
  pillarList = ["ASD", "CSD", "DAI", "EPD", "ESD", "HASS"];
  searchForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute) {}

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
    slots: [{type:"T1", startTime:{minute: 0, hour: 8, gapInMinute: TimeStamp.prototype.gapInMinute}, endTime: {minute: 0, hour: 10, gapInMinute: TimeStamp.prototype.gapInMinute}, date: "MON", hasOverlap: Slot.prototype.hasOverlap, offset: 0}, {type:"T2", startTime:{minute: 0, hour: 15, gapInMinute: TimeStamp.prototype.gapInMinute}, endTime: {minute: 0, hour: 16, gapInMinute: TimeStamp.prototype.gapInMinute}, date:"THU", hasOverlap: Slot.prototype.hasOverlap, offset: 0}]
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
    slots: [{type:"T1", startTime:{minute: 0, hour: 10, gapInMinute: TimeStamp.prototype.gapInMinute}, endTime: {minute: 0, hour: 12, gapInMinute: TimeStamp.prototype.gapInMinute}, date: "MON", hasOverlap: Slot.prototype.hasOverlap, offset: 0}, {type:"lab1", startTime:{minute: 0, hour: 16, gapInMinute: TimeStamp.prototype.gapInMinute}, endTime: {minute: 0, hour: 17, gapInMinute: TimeStamp.prototype.gapInMinute}, date: "MON", hasOverlap: Slot.prototype.hasOverlap, offset: 0}]
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
    this.enrolledCourseSet.add(this.courseC);
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

  enrollCourse(selectedCourse: Course): void {
    this.enrolledCourseSet = this.enrolledCourseSet.add(selectedCourse);
    this.enrolledCourseSet = new Set([...this.enrolledCourseSet]);
    this.message.success(`Enroll in Course: ${selectedCourse.subject}`);
  }

  dropCourse(id: number, subject: string): void {
    this.message.info(`Drop Course: ${subject}`);
    this.enrolledCourseSet.forEach(course => {
      if (course.id == id) {
        this.enrolledCourseSet.delete(course);
      }
    });
    this.enrolledCourseSet = new Set([...this.enrolledCourseSet]);
  }
}
