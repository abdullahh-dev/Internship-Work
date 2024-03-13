import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<{
    username: string;
    imagePath: string;
  }>({ username: '', imagePath: '' });
  constructor() {}
  userData$ = this.userDataSubject.asObservable();

  setUserData(username: string, imagePath: string) {
    this.userDataSubject.next({ username, imagePath });
  }
}
