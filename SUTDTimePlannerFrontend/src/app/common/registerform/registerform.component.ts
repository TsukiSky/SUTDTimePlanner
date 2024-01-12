import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {environment} from 'src/environments/environment';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.less']
})
export class RegisterformComponent implements OnInit {
  @Output() switchView = new EventEmitter<void>();
  public username = '';
  public email = '';
  public password = '';

  validateForm: FormGroup<{
    email: FormControl<string>;
    username: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private nzMessageService: NzMessageService, private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
  }

  public switchLogin(): void {
    this.switchView.emit();
  }

  public async register(): Promise<void> {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    } else if (!this.validateEmail()) {
      this.nzMessageService.error("Please use your SUTD email to register")
      return
    } else {
      const user = {
        username: this.username,
        email: this.email + "@mymail.sutd.edu.sg",
        password: this.password
      }
      // send to backend
      let response = await fetch(`${environment.apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      let data = await response.text()
      if (data === "success") {
        this.nzMessageService.success("Registration successful, please check your email for verification")
        this.switchLogin()
      } else {
        this.nzMessageService.error(data)
      }
    }

  }

  public validateEmail() {
    const emailRegex = /^[\w-\.]+@mymail.sutd.edu.sg$/; // Basic email regex; adjust as needed
    const valid = emailRegex.test(this.email + "@mymail.sutd.edu.sg");
    return valid;
  }
}
