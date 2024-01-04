import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.less']
})
export class LeftSidebarComponent implements OnInit {
  isLeftBarCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
