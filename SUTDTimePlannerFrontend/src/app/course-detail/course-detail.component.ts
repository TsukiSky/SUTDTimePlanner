import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/Course';
import { CourseService } from '../course.service';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';
import { GlobalStoreService } from '../global-store.service';
import { formatDistance } from 'date-fns';
import { Comment } from '../model/Comment';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.less']
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  user!: User | null;
  comment: string = '';
  terms!: number[];

  async like(curComment: Comment): Promise<void> {
    let response = await fetch(`${environment.apiUrl}/comment/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        commentId: curComment.id,
        userId: this.user?.id
      })
    })
    let data = await response.text();
    if (data) {
      if (curComment.likes.includes(this.user?.id!)) {
        curComment.likes = curComment.likes.filter(id => id != this.user?.id);
      } else {
        curComment.likes.push(this.user?.id!);
      }
    } else {
      this.nzMessageService.error("Something wrong with the server, please try again later.")
    }
    
  }

  async dislike(curComment: Comment): Promise<void> {
    let response = await fetch(`${environment.apiUrl}/comment/dislike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        commentId: curComment.id,
        userId: this.user?.id
      })
    })
    let data = await response.text();
    if (data) {
      if (curComment.dislikes.includes(this.user?.id!)) {
        curComment.dislikes = curComment.dislikes.filter(id => id != this.user?.id);
      } else {
        curComment.dislikes.push(this.user?.id!);
      }
    } else {
      this.nzMessageService.error("Something wrong with the server, please try again later.")
    }
  }

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private globalStoreService: GlobalStoreService, private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let courseId = params['id'];
      console.log(courseId)
      this.courseService.getAllCourses().subscribe(courses => {
        this.course = courses.find(course => course.courseId == courseId)!;
        this.terms = this.course.terms.map(term => term.term);
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
      isAnonymous: isAnonymous,
      likes: [],
      dislikes: []
    })
    this.comment = '';
  }

  public calcTimeDist(time: string): string {
    return formatDistance(new Date(time), new Date())
  }
}


