import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  public isLogin: boolean = true;
  constructor(private cdr: ChangeDetectorRef) { 
    this.cdr = cdr;
  }

  ngOnInit(): void {
  }

  public switchRegister(): void {
    console.log("switchRegister")
    this.isLogin = false;
    console.log(this.cdr)
    // this.cdr.detectChanges();
  }

  public switchLogin(): void {
    console.log("switchLogin")
    this.isLogin = true;
  }

}
