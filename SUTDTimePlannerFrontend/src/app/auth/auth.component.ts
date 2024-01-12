import {Component, OnInit} from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  public isLogin: boolean = true;

  constructor(private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.createNotification()
  }

  public switchRegister(): void {
    this.isLogin = false;
  }

  public switchLogin(): void {
    this.isLogin = true;
  }

  public createNotification(): void {
    this.notification.blank(
      "<b>Notification</b>",
      "Hello! Welcome to SUTDTimePlanner!<br>" +
      "<br>" +
      "We developed this website to help you search for and schedule courses more efficiently before the semester starts. You can also leave your comments on every course!<br>" +
      "<br>" +
      "We are currently in beta, so please do not hesitate to contact us if you encounter any bugs! And you know, try not to break the website :P<br>",
      {
        nzDuration: 0,
        nzStyle: {
          width: '500px',
        }
      })
  }
}
