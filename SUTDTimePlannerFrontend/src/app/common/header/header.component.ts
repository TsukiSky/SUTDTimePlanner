import { Component, Input, OnInit } from '@angular/core';
import { GlobalStoreService } from 'src/app/global-store.service';
import { User } from 'src/app/dto/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() loggedIn: boolean = false

  user?: User | null

  constructor(private globalStoreService: GlobalStoreService, private router: Router) { }

  ngOnInit(): void {
    this.globalStoreService.userInfo$.subscribe(user => {
        this.user = user
    })
  }

  public logout() {
    this.globalStoreService.updateUserInfo(null)
    this.router.navigate(['/auth'])
  }

}
