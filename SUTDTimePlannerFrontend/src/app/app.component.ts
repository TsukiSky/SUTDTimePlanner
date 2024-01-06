import { Component, OnInit } from '@angular/core';
import { NzModalService } from "ng-zorro-antd/modal";

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
