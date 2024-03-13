import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  constructor(private http: HttpClient, private api: ApiService) {}
  getUsers() {
    this.api.userVerify().subscribe((data) => {
      console.log(data);
    });
  }
}
