import { Component, OnInit } from '@angular/core';
import { Course } from './model/Course';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import {CourseService} from "./course.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Class} from "./model/Class";
import {downloadImage, isOverlapped} from "./utils/Utils";

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
  enrolledClassSet = new Set<Class>();
  starredCourseSet = new Set<Course>();
  conflictCourseGroups: Array<Set<Course>> = new Array<Set<Course>>();


  currentPageIndex = 1;
  pageSize = 10;

  bgColors: Array<string> = ["#A6CFE2", "#FDF06F", "#CAFFB9", "#FBCCD4", "#FF9966", "#ABCEE2", "#C7EBFB", "#77EEDF"];
  usedColors: Array<string> = [];


  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courseList = response;
        for (let course of this.courseList) {
          course.isStarred = false;
          course.termsInString = course.terms.map(term => term.term).join(', ');  // set up termsInString
          for (let clas of course.classes) {
            clas.lecturersInString = clas.lecturers.map(lecturer => lecturer.name).join(', ');
            clas.timeInString = clas.slots.map(slot => `${slot.type}: ${slot.date} ${slot.startTime} to ${slot.endTime}`).join(' | ')
            clas.courseName = course.name;
            for (let slot of clas.slots) {
              slot.courseName = course.name;
            }
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
    this.expandCourseSet.clear();
  }

  onStar(course: Course): void {
    if (course.isStarred) {
      this.message.warning(`Unstarred course ${course.name}`, { nzDuration: 1200 });
      this.starredCourseSet.delete(course);
    } else {
      this.message.success(`Starred course ${course.name}`, { nzDuration: 1200 });
      this.starredCourseSet.add(course);
    }
    course.isStarred = !course.isStarred;

  }

  onReset(): void {
    this.searchForm.reset();
    this.onSearch();
    this.expandCourseSet.clear();
  }

  enrollCourse(selectedCourse: Course): void {
    if (selectedCourse.classes.length > 1) {
      this.message.error(`${selectedCourse.name} has multiple time slots available. Please choose a time slot to continue.`, { nzDuration: 6000 });
      this.onCourseExpandChange(selectedCourse.courseId, true);
    } else {
      this.enrollClass(selectedCourse, 0);
    }
  }

  enrollClass(course: Course, classIndex: number): void {
    let clas = course.classes[classIndex];

    this.updateTimeConflict(course, clas);
    console.log(this.conflictCourseGroups);

    this.assignColorToCourse(course);
    this.enrolledCourseSet = this.enrolledCourseSet.add(course);
    this.enrolledCourseSet = new Set([...this.enrolledCourseSet]);
    this.enrolledClassSet = this.enrolledClassSet.add(clas);
    this.enrolledClassSet = new Set([...this.enrolledClassSet]);
    this.message.success(`Enroll in Course: ${course.name}`, { nzDuration: 1200 });

    if (this.expandCourseSet.has(course.courseId)) {
      this.onCourseExpandChange(course.courseId, false);
    }
  }

  dropCourse(id: number, subject: string): void {
    this.message.info(`Drop Course: ${subject}`, { nzDuration: 1200 });
    this.enrolledCourseSet.forEach(course => {
      if (course.courseId == id) {
        this.dropTimeConflict(course);
        this.recoverColorFromCourse(course);
        this.enrolledCourseSet.delete(course);
      }
    });
    this.enrolledCourseSet = new Set([...this.enrolledCourseSet]);

    this.enrolledClassSet.forEach(clas => {
      if (clas.courseName == subject) {
        this.enrolledClassSet.delete(clas);
      }
    })
    this.enrolledClassSet = new Set([...this.enrolledClassSet]);
  }

  assignColorToCourse(course: Course) {
    for (const color of this.bgColors) {
      if (!this.usedColors.includes(color)) {
        course.bgColor = color;
        course.classes.forEach(clas => {
          clas.slots.forEach(slot => {
            slot.courseBgColor = color;
          });
        });
        this.usedColors.push(color);
        break;
      }
    }
  }

  recoverColorFromCourse(course: Course) {
    this.usedColors = this.usedColors.filter(color => color !== course.bgColor);
    this.bgColors.push(course.bgColor);
    course.bgColor = "";
  }

  updateTimeConflict(newCourse: Course, newClas: Class) {
    /*
    * update the time conflict sets
    * */
    for (const clas of this.enrolledClassSet) {
      let clasConflictFound = false;
      for (const slot of clas.slots) {
        for (const newSlot of newClas.slots) {
          if (isOverlapped(slot, newSlot)) {
            console.log(slot);
            console.log(newSlot);
            // update conflict courses set
            clasConflictFound = true;
            let groupUpdated = false;
            for (const conflictGroup of this.conflictCourseGroups) {
              for (const course of conflictGroup) {
                if (course.name == slot.courseName) {
                  // conflict group found
                  conflictGroup.add(newCourse);
                  groupUpdated = true;
                  break;
                }
              }
              if (groupUpdated) {
                break;
              }
            }
            if (!groupUpdated) {
              // add a new group
              let conflictedCourse: Course;
              for (const course of this.enrolledCourseSet) {
                if (course.name == slot.courseName) {
                  conflictedCourse = course;
                  break;
                }
              }
              let newGroup = new Set<Course>([conflictedCourse!, newCourse]);
              this.conflictCourseGroups.push(newGroup);
            }
          }
          if (clasConflictFound) {
            break;
          }
        }
        if (clasConflictFound) {
          break;
        }
      }
    }
  }

  dropTimeConflict(dropCourse: Course) {
    for (const group of this.conflictCourseGroups) {
      if (group.has(dropCourse)) {
        group.delete(dropCourse);

      }
    }
    this.conflictCourseGroups = this.conflictCourseGroups.filter(set => set.size >= 2);
  }

  onDownload() {
    downloadImage("timetable");
  }
}
