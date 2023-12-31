import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.less']
})
export class RegisterformComponent implements OnInit {
  @Output() switchView = new EventEmitter<void>();
  public loginValid = true;
  public username = '';
  public email = '';
  public password = '';
  constructor() { }

  ngOnInit(): void {
  }

  public switchLogin(): void {
    this.switchView.emit();
  }

  public onSubmit(): void {
    
  }

  public async register(): Promise<void> {
    console.log("registering")
    if (!this.validateEmail()) {
      alert("Please use your sutd email")
      return
    }
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    }
    console.log(user)
    // send to backend
    let response = await fetch(`${environment.apiUrl}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    
    console.log(response)
    let data = await response.text()
    alert(data)
  }

  public validateEmail() {
      const emailRegex = /^[\w-\.]+@mymail.sutd.edu.sg$/; // Basic email regex; adjust as needed
      const valid = emailRegex.test(this.email);
      console.log(valid)
      return valid;
  }

}
