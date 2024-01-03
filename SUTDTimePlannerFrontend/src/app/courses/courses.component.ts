import { Component, OnInit } from '@angular/core';
import { Course } from '../model/Course';
import { CourseService } from '../course.service';
import { User } from '../model/User';
import { GlobalStoreService } from '../global-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.less']
})
export class CoursesComponent implements OnInit {
  isLeftBarCollapsed = true;
  courses?: Course[]
  allCourseSelected: boolean = true
  user?: User
  PILLARS = ["CSD", "ESD", "EPD", "ASD", "DAI"]

  constructor(private courseService: CourseService,
    private globalStoreService: GlobalStoreService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses
    })
    this.user = this.globalStoreService.getUserInfo()!
  }

  getPillarCourses(pillar: string, allCourseSelected: boolean): Course[][] {
      let courseList: Course[] = []
      this.courses!.forEach(course => {
        if (course.pillar == pillar && (allCourseSelected || this.user?.classesIds.includes(course.courseId))) {
          courseList.push(course)
        }
      })
      let rearrangedCourseList: Course[][] = []
      for (let i=0; i<courseList.length;i+=2) {
        rearrangedCourseList.push(courseList.slice(i,i+2))
      }
      return rearrangedCourseList;
  }
  
  setAllCourseSelected(selected: boolean): void {
    this.allCourseSelected = selected
  }


}
