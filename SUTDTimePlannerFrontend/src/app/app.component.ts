import { Component, OnInit } from '@angular/core';
import { Course } from './model/Course';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CourseService} from "./course.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Class} from "./model/Class";
import {clearData, downloadImage, getData, isOverlapped, storeData} from "./utils/Utils";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  ngOnInit(): void {
  }

}
