import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './model/User';


@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService {
  private _userInfo = new BehaviorSubject<User | null>(null);
  public readonly userInfo$ = this._userInfo.asObservable();

  constructor() { 
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this._userInfo.next(JSON.parse(userInfo));
    }
  }

  public updateUserInfo(userInfo: User | null): void {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
    this._userInfo.next(userInfo);
  }

  public getUserInfo(): User | null {
    return this._userInfo.getValue();
  }
}
