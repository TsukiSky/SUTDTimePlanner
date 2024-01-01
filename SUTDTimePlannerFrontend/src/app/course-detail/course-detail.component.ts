import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/Course';
import { CourseService } from '../course.service';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';
import { GlobalStoreService } from '../global-store.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.less']
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  user!: User | null;
  comment: string = '';

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private globalStoreService: GlobalStoreService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let courseId = params['id'];
      console.log(courseId)
      this.courseService.getAllCourses().subscribe(courses => {
        this.course = courses.find(course => course.courseId == courseId)!;
      });
      console.log(this.course)
    });
    if (this.globalStoreService.getUserInfo() != null) {
      this.user = this.globalStoreService.getUserInfo();
    }
  }

  public async onPost(isAnonymous: boolean): Promise<void> {
    console.log(this.comment)
    let payload = {
      username: this.user?.username,
      courseId: this.course.courseId,
      content: this.comment,
      isAnonymous: isAnonymous
    }
    console.log(payload)
    let response = await fetch(`${environment.apiUrl}/course/add_comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    let data = await response.text();
    // this.courseService.requestAllCourse().subscribe(courses => {
    //   this.course = courses.find(course => course.courseId == this.course.courseId)!;
    // });
    this.course.comments.push({
      commenter: this.user?.username!,
      content: this.comment,
      time: new Date().toISOString(),
      isAnonymous: isAnonymous
    })
    this.comment = '';
  }

}
