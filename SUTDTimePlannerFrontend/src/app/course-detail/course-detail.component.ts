import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/Course';
import {CourseService} from '../course.service';
import {environment} from 'src/environments/environment';
import {User} from '../model/User';
import {GlobalStoreService} from '../global-store.service';
import {formatDistance} from 'date-fns';
import {Comment} from '../model/Comment';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from "ng-zorro-antd/modal";


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
  loadingMore = false;
  commentsShown: Comment[] = [];
  endCommentIndex: number = 5;

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
              private globalStoreService: GlobalStoreService, private nzMessageService: NzMessageService,
              private message: NzMessageService,) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let courseId = params['id'];
      this.courseService.getAllCourses().subscribe(courses => {
        this.course = courses.find(course => course.courseId == courseId)!;
        this.terms = this.course.terms.map(term => term.term);
        this.commentsShown = this.course.comments.slice(0, this.endCommentIndex);
      });
    });
    if (this.globalStoreService.getUserInfo() != null) {
      this.user = this.globalStoreService.getUserInfo();
    }
  }

  public async onPost(isAnonymous: boolean): Promise<void> {
    let payload = {
      username: this.user?.username,
      courseId: this.course.courseId,
      content: this.comment,
      isAnonymous: isAnonymous
    }
    let response = await fetch(`${environment.apiUrl}/course/add_comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    this.course.comments.push({
      commenter: this.user?.username!,
      content: this.comment,
      time: new Date().toISOString(),
      isAnonymous: isAnonymous,
      likes: [],
      dislikes: []
    })


    this.message.success("Your comment is successfully published.");
    this.comment = '';
  }

  public calcTimeDist(time: string): string {
    return formatDistance(new Date(time), new Date())
  }

  onLoadMore(): void {
    if (this.endCommentIndex >= this.course.comments.length) {
      this.message.error("You have reached the end of the comments.");
      return;
    }
    this.loadingMore = true;
    this.endCommentIndex += 5;
    this.commentsShown = this.course.comments.slice(0, this.endCommentIndex);
    this.loadingMore = false;
    this.message.success("More comments are loaded.");
  }
}


