import { Component, OnInit } from '@angular/core';
import { GlobalStoreService } from 'src/app/global-store.service';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  user?: User

  constructor(private globalStoreService: GlobalStoreService, private router: Router) { }

  ngOnInit(): void {
    this.globalStoreService.userInfo$.subscribe(user => {
      if (user!=null) {
        this.user = user
      }
    })
  }

  public logout() {
    this.globalStoreService.updateUserInfo(null)
    this.router.navigate(['/auth'])
  }

}
