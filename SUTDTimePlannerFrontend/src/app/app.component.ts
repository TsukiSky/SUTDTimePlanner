import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Course } from './model/Course';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TimeStamp } from './model/TimeStamp';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Slot } from './model/Slot';
import {CourseService} from "./course.service";
import {HttpErrorResponse} from "@angular/common/http";

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
  isCollapsed = true;
  sideBarCardView = false;

  courseList: Course[] = [];
  filteredCourse: Course[] = [];
  currentPageCourse: Course[] = [];

  expandCourseSet = new Set<number>();
  enrolledCourseSet = new Set<Course>();

  currentPageIndex = 1;
  pageSize = 10;

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courseList = response;
        for (let course of this.courseList) {
          course.termsInString = course.terms.map(term => term.term).join(', ');  // set up termsInString
          for (let clas of course.classes) {
            clas.lecturersInString = clas.lecturers.map(lecturer => lecturer.name).join(', ');
          }
        }
        this.filterCourse();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  constructor(private formBuilder: FormBuilder,
    private message: NzMessageService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      term: [null, null],
      pillar: [null, null],
      name: [null, null]
    });
    this.getAllCourses();
  }

  onPageIndexChange(index: number) {
    this.currentPageIndex = index;
    this.filterCourse();
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.filterCourse();
  }

  filterCourse() {
    this.filteredCourse = this.courseList;

    const searchTerm = this.searchForm.value.term;
    const searchPillar = this.searchForm.value.pillar;
    const searchName = this.searchForm.value.name;

    if (searchTerm !== null) {
      this.filteredCourse = this.courseList.filter(course =>
        course.termsInString.includes(`${searchTerm}`)
      );
    }

    if (searchPillar !== null) {
      this.filteredCourse = this.courseList.filter(course =>
        course.pillar.includes(`${searchPillar}`)
      );
    }

    if (searchName !== null) {
      this.filteredCourse = this.courseList.filter(course =>
        course.name.includes(`${searchName}`)
      );
    }

    // apply pagination
    const startIndex = (this.currentPageIndex-1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPageCourse = this.filteredCourse.slice(startIndex, endIndex);
  }


  onCourseExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandCourseSet.add(id);
    }else {
      this.expandCourseSet.delete(id);
    }
  }

  onSearch(): void {
    this.currentPageIndex = 1;
    this.filterCourse();
    console.log("haha");
  }

  onReset(): void {
    this.searchForm.reset();
    this.onSearch();
  }

  enrollCourse(selectedCourse: Course): void {
    this.enrolledCourseSet = this.enrolledCourseSet.add(selectedCourse);
    this.enrolledCourseSet = new Set([...this.enrolledCourseSet]);
    this.message.success(`Enroll in Course: ${selectedCourse.name}`);
  }

  dropCourse(id: number, subject: string): void {
    this.message.info(`Drop Course: ${subject}`);
    this.enrolledCourseSet.forEach(course => {
      if (course.courseId == id) {
        this.enrolledCourseSet.delete(course);
      }
    });
    this.enrolledCourseSet = new Set([...this.enrolledCourseSet]);
  }
}
