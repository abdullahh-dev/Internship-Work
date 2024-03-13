import { environmentClass } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isProfilePopupOpen = false;
  imagesUrl = environmentClass.imagesUrl;
  imagePath = '';
  username = '';
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.userService.userData$.subscribe((userData) => {
      this.username = userData.username;
      this.imagePath = userData.imagePath;
    });
  }

  toggleProfilePopup() {
    this.isProfilePopupOpen = !this.isProfilePopupOpen;
  }
  logout() {
    setTimeout(() => {
      this.router.navigateByUrl('login');
      Cookies.remove('jwt');
    }, 1000);
  }
}
