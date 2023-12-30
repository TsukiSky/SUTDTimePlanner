import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  constructor() { }

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
    alert(data)
  }

  public onSubmit(): void {

  }

}
