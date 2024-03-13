import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { catchError, of } from 'rxjs';
import Cookies from 'js-cookie';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  invalidCredentials = false;
  errorMessage: string = '';
  imagePath: string = '';
  name: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.api
      .loginUser(user)
      .pipe(
        catchError((error: any) => {
          if (error.status === 401) {
            console.log('Unauthorized. Invalid credentials.');
            this.invalidCredentials = true;
            this.errorMessage = 'Invalid credentials';
          } else {
            console.error('Error during login:', error);
          }
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          console.log(response);
          this.name = response.name;
          this.imagePath = response.imagePath;
          const token = response.token;
          this.userService.setUserData(this.name, this.imagePath);
          Cookies.set('jwt', token, {
            expires: 1,
            secure: true,
            sameSite: 'strict',
          });
          console.log('Valid User');
          this.router.navigateByUrl('home');
        }
      });
  }
}
