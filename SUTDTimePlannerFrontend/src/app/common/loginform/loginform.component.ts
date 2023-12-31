import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { GlobalStoreService } from 'src/app/global-store.service';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.less']
})
export class LoginformComponent implements OnInit {
  @Output() switchView = new EventEmitter<void>();

  public loginValid = true;
  public email = '';
  public password = '';
  constructor(private router: Router, private globalStateService: GlobalStoreService) { }

  ngOnInit(): void {
  }

  public switchRegister(): void {
    console.log("emmittin")
    this.switchView.emit();
  }

  public async login(): Promise<void> {
    console.log("logging in")
    const user = {
      email: this.email,
      password: this.password
    }
    let response = await fetch(`${environment.apiUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    let data = await response.text()
    if (response.status == 200) {
      if (data) {
        console.log(data)
        this.globalStateService.updateUserInfo(JSON.parse(data))
        this.router.navigate(['/'])
      } else {
        alert("Invalid email or password")
      }
    }
    
  }

  public onSubmit(): void {

  }

}
