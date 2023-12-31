import { Component, OnInit } from '@angular/core';
import { Course } from '../model/Course';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CourseService} from "../course.service";
import { GlobalStoreService } from '../global-store.service';
import {HttpErrorResponse} from "@angular/common/http";
import {Class} from "../model/Class";
import {clearData, downloadImage, getData, isOverlapped, storeData} from "../utils/Utils";
import { NzModalService } from "ng-zorro-antd/modal";
import { User } from '../model/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
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
  tableIsLoading = false;

  bgColors: Array<string> = ["#A6CFE2", "#FDF06F", "#CAFFB9", "#FBCCD4", "#FF9966", "#ABCEE2", "#C7EBFB", "#77EEDF"];
  usedColors: Array<string> = [];
  alternativeClasses: Map<Class, Class[]> = new Map<Class, Class[]>();

  user?: User;
  

  async requestCourseData() {
    let starredCourseIds = this.user?.starCourseIds!;
    let enrolledCourseIds = this.user?.enrolCourseIds!;
    let enrolledClassIds = this.user?.classesIds!;
    console.log(this.courseList)
    for (let course of this.courseList) {
      // load starred courses
      if (starredCourseIds.includes(course.courseId)) {
        console.log("course: ", course)
        this.onStar(course);
      }

      // load enrolled classes
      if (enrolledCourseIds.includes(course.courseId)) {
        // course is enrolled
        for (let i = 0; i < course.classes.length; i++) {
          if (enrolledClassIds.includes(course.classes[i].classId)) {
            // class is enrolled
            this.enrollClass(course, i);
            break;
          }
        }
      }
    }
  }

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courseList = response;
        for (let course of this.courseList) {
          course.isStarred = false;
          course.termsInString = course.terms.map(term => term.term).join(', ');  // set up termsInString
          for (let clas of course.classes) {
            // clas.lecturersInString = clas.lecturers.map(lecturer => lecturer.name).join(', ');
            clas.timeInString = clas.slots.map(slot => `${slot.type}: ${slot.date} ${slot.startTime} to ${slot.endTime}`).join(' | ');
            clas.courseName = course.name;
            for (let slot of clas.slots) {
              slot.courseName = course.name;
            }
          }
        }
        this.filterCourse();
        this.requestCourseData();
        // this.loadLocalStorage();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  constructor(private formBuilder: FormBuilder,
    private message: NzMessageService,
    private courseService: CourseService,
    private modal: NzModalService,
    private globalStateService: GlobalStoreService) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      term: [null, null],
      pillar: [null, null],
      name: [null, null]
    });
    this.tableIsLoading = true;
    this.getAllCourses();
    this.globalStateService.userInfo$.subscribe(
      obj => {
        if (obj) {
          this.user = obj;
          console.log(this.user)
          console.log(obj)
        }
      }
    )
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
      this.filteredCourse = this.filteredCourse.filter(course =>
        course.termsInString.includes(`${searchTerm}`)
      );
    }

    if (searchPillar !== null) {
      this.filteredCourse = this.filteredCourse.filter(course =>
        course.pillar.includes(`${searchPillar}`)
      );
    }

    if (searchName !== null) {
      this.filteredCourse = this.filteredCourse.filter(course =>
        course.name.includes(`${searchName}`)
      );
    }

    // apply pagination
    const startIndex = (this.currentPageIndex-1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPageCourse = this.filteredCourse.slice(startIndex, endIndex);
    this.tableIsLoading = false;
  }

  onCourseExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandCourseSet.add(id);
    }else {
      this.expandCourseSet.delete(id);
    }
  }

  onSearch(): void {
    this.tableIsLoading = true;
    this.currentPageIndex = 1;
    this.filterCourse();
    this.expandCourseSet.clear();
  }

  async onStar(course: Course): Promise<void> {
    if (course.isStarred) {
      this.message.warning(`Unstarred course ${course.name}`, { nzDuration: 1200 });
      this.starredCourseSet.delete(course);
      let response = await fetch(`${environment.apiUrl}/user/remove_star_course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.user?.username,
          courseId: course.courseId
        })
      })
    } else {
      this.message.success(`Starred course ${course.name}`, { nzDuration: 1200 });
      this.starredCourseSet.add(course);
      let response = await fetch(`${environment.apiUrl}/user/add_star_course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.user?.username,
          courseId: course.courseId
        })
      })
    }
    course.isStarred = !course.isStarred;
    // storeData("starredCourseSet", Array.from(this.starredCourseSet).map(course => course.courseId));
  }

  onReset(): void {
    this.searchForm.reset();
    this.onSearch();
    this.expandCourseSet = new Set<number>();
    this.enrolledCourseSet = new Set<Course>();
    this.starredCourseSet = new Set<Course>();
    this.enrolledClassSet = new Set<Class>();
    this.alternativeClasses = new Map<Class, Class[]>();
    this.conflictCourseGroups = new Array<Set<Course>>();
    this.usedColors = new Array<string>();
  }

  enrollCourse(selectedCourse: Course): void {
    if (selectedCourse.classes.length > 1) {
      this.message.error(`${selectedCourse.name} has multiple time slots available. Please choose a time slot to continue.`, { nzDuration: 6000 });
      this.onCourseExpandChange(selectedCourse.courseId, true);
    } else {
      this.enrollClass(selectedCourse, 0);
    }
  }

  async enrollClass(course: Course, classIndex: number): Promise<void> {
    let clas = course.classes[classIndex];

    this.updateTimeConflict(course, clas);

    this.assignColorToCourse(course);
    this.enrolledCourseSet = this.enrolledCourseSet.add(course);
    this.enrolledCourseSet = new Set([...this.enrolledCourseSet]);
    this.enrolledClassSet = this.enrolledClassSet.add(clas);
    this.enrolledClassSet = new Set([...this.enrolledClassSet]);
    this.message.success(`Enroll in Course: ${course.name}`, { nzDuration: 1200 });

    // tell the backend to add the course and class
    let response = await fetch(`${environment.apiUrl}/user/add_enrol_course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.user?.username,
        courseId: course.courseId,
        classId: clas.classId
      })
    })

    console.log(response)

    // storeData("enrolledCourseSet", Array.from(this.enrolledCourseSet).map(course => course.courseId));
    // storeData("enrolledClassSet", Array.from(this.enrolledClassSet).map(clas => clas.classId));

    if (this.expandCourseSet.has(course.courseId)) {
      this.onCourseExpandChange(course.courseId, false);
    }

    if (course.classes.length > 1) {
      this.alternativeClasses.set(clas, course.classes.filter(element => element.classId != clas.classId));
    }
  }

  async dropCourse(id: number, subject: string): Promise<void> {
    this.message.info(`Drop Course: ${subject}`, { nzDuration: 1200 });
    let deleteCourseIds: number[] = [];
    this.enrolledCourseSet.forEach(course => {
      if (course.courseId == id) {
        this.dropTimeConflict(course);
        this.recoverColorFromCourse(course);
        this.enrolledCourseSet.delete(course);
        deleteCourseIds.push(course.courseId);
      }
    });
    this.enrolledCourseSet = new Set([...this.enrolledCourseSet]);

    let deleteClassIds: number[] = [];
    this.enrolledClassSet.forEach(clas => {
      if (clas.courseName == subject) {
        this.enrolledClassSet.delete(clas);
        this.alternativeClasses.delete(clas);
        deleteClassIds.push(clas.classId);
      }
    });
    this.enrolledClassSet = new Set([...this.enrolledClassSet]);

    // tell the backend to delete the course and class
    let response = await fetch(`${environment.apiUrl}/user/drop_course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.user?.username,
        courseIds: deleteCourseIds,
        classIds: deleteClassIds
      })
    })

    console.log(response)


    // storeData("enrolledCourseSet", Array.from(this.enrolledCourseSet).map(course => course.courseId));
    // storeData("enrolledClassSet", Array.from(this.enrolledClassSet).map(clas => clas.classId));
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
              if (newGroup.size > 1) {
                this.conflictCourseGroups.push(newGroup);
              }
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

  onClassSetChange(newClas: Class) {
    let enrolledCourse: Course;
    for (const enrolledCourseSetElement of this.enrolledCourseSet) {
      if (enrolledCourseSetElement.name == newClas.courseName) {
        enrolledCourse = enrolledCourseSetElement;
        break;
      }
    }
    this.dropTimeConflict(enrolledCourse!);
    this.updateTimeConflict(enrolledCourse!, newClas);
  }

  onDownload(ratio: string) {
    downloadImage("timetable", ratio);
  }

  clearCache() {
    this.modal.confirm({
      nzTitle: '<i>Do you want to clear all local caches?</i>',
      nzContent: '<b>All tracks of enrolled courses and starred courses will be cleaned.</b>',
      nzOnOk: () => {
        clearData();
        this.onReset();
        this.message.success("All local caches are cleaned", { nzDuration: 1200 });
      },
      nzStyle: {top: '30%'}
    });
  }

  onAboutTimePlanner() {
    this.modal.info({
      nzTitle: '<i>About SUTD Time Planner</i>',
      nzContent: "<span><b><i>SUTD Time Planner</i></b> is a web application designed to assist SUTD students streamlining their course selection process and make informed decisions about academic schedules in a semester. <br><br>"
      + "This web tool is developed in collaboration with <b>SUTD Admin Office</b>, leveraging their direct provision of course data. We extend our sincere appreciation for their invaluable support and assistance. Their contribution has been instrumental in making this tool possible.<br><br>"
      + "For more information or to contribute, please see <a href='https://github.com/TsukiSky/SUTDTimePlanner' target=\"_blank\">https://github.com/TsukiSky/SUTDTimePlanner</a></span>",

      nzStyle: {
        top: '30%',
        width: '600px'
      }
    })
  }
}

