import {Component, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  isLeftBarCollapsed = false

  ngOnInit(): void {
  }

  constructor(private modal: NzModalService,) {
  }

  onAboutTimePlanner() {
    this.modal.info({
      nzTitle: '<i>About SUTD Time Planner</i>',
      nzContent: "<span><b><i>SUTD Time Planner</i></b> is a web application designed to assist SUTD students in course selection and making proper decisions about academic schedules in a semester. <br><br>"
        + "This web tool is developed in collaboration with <b>SUTD Admin Office</b>. We extend our sincere appreciation for their support and assistance in providing course information.<br><br>"
        + "Courses are fetched from SUTD's official website. Click <a href=''>here</a> to update courses. "
        + "For more information or to contribute, please see <a href='https://github.com/TsukiSky/SUTDTimePlanner' target=\"_blank\">SUTD Time Planner</a></span>.",
      nzStyle: {
        top: '30%',
        width: '600px'
      }
    })
  }
}
