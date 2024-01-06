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
  courses?: Course[]
  user?: User

  constructor(private courseService: CourseService,
    private globalStoreService: GlobalStoreService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses
    })
    this.user = this.globalStoreService.getUserInfo()!
  }
}
