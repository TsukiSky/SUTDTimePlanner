import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import {GlobalStoreService} from 'src/app/global-store.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.less']
})
export class LoginformComponent implements OnInit {
  @Output() switchView = new EventEmitter<void>();

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public email = '';
  public password = '';

  constructor(private router: Router, private globalStateService: GlobalStoreService,
              private nzMessageService: NzMessageService, private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
  }

  public switchRegister(): void {
    this.switchView.emit();
  }

  public async login(): Promise<void> {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    } else {
      const user = {
        email: this.email + '@mymail.sutd.edu.sg',
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
          this.globalStateService.updateUserInfo(JSON.parse(data))
          this.router.navigate(['/'])
        } else {
          this.nzMessageService.error("Invalid email or password")
        }
      }
    }
  }
}
