import {Component, OnInit} from '@angular/core';
import {Course} from '../model/Course';
import {CourseService} from '../course.service';
import {User} from '../model/User';
import {GlobalStoreService} from '../global-store.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {
  courses?: Course[];
  selectedCourses?: Course[];
  shownCourses?: Course[];
  termList = [1,2,3,4,5,6,7,8];
  pillarList = ["ASD", "CSD", "DAI", "EPD", "ESD", "HASS"];
  searchForm!: FormGroup;
  user?: User;
  startCourseIndex = 0;
  endCourseIndex = 10;
  currentPage = 1;
  isLeftBarCollapsed = true;

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder,
              private globalStoreService: GlobalStoreService) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      term: [null, null],
      pillar: [null, null],
      name: [null, null]
    });

    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses
      this.courses.forEach(course => {
        course.description = "this is the course description"
      });
      this.selectedCourses = this.courses
      this.shownCourses = this.selectedCourses.slice(this.startCourseIndex, this.endCourseIndex)
    })
    this.user = this.globalStoreService.getUserInfo()!
  }

  onSearch() {
    const searchTerm = this.searchForm.value.term;
    const searchPillar = this.searchForm.value.pillar;
    const searchName = this.searchForm.value.name;
    this.selectedCourses = this.courses;

    if (searchTerm !== null) {
      this.selectedCourses = this.selectedCourses?.filter(course =>
        course.termsInString.includes(`${searchTerm}`)
      );
    }

    if (searchPillar !== null) {
      this.selectedCourses = this.selectedCourses?.filter(course =>
        course.pillar.includes(`${searchPillar}`)
      );
    }

    if (searchName !== null) {
      this.selectedCourses = this.selectedCourses?.filter(course =>
        course.name.includes(`${searchName}`)
      );
    }

    // apply pagination
    this.startCourseIndex = 0;
    this.endCourseIndex = 10;
    this.shownCourses = this.selectedCourses!.slice(this.startCourseIndex, this.endCourseIndex)
  }

  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    pageIndex -= 1;
    this.startCourseIndex = pageIndex * 10;
    this.endCourseIndex = this.startCourseIndex + 10;
    this.shownCourses = this.selectedCourses!.slice(this.startCourseIndex, this.endCourseIndex)
  }

  onClear() {
    this.searchForm.reset();
    this.selectedCourses = this.courses;
    this.startCourseIndex = 0;
    this.endCourseIndex = 10;
    this.shownCourses = this.selectedCourses!.slice(this.startCourseIndex, this.endCourseIndex)
    this.currentPage = 1;

  }
}
