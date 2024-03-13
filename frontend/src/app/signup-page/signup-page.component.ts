import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signUpForm: FormGroup;
  errMsg = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {
    this.signUpForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(64),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirm_password: new FormControl('', [Validators.required]),
      profile: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}
  onImagePicked(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signUpForm.patchValue({ profile: file });
    this.signUpForm.get('profile').updateValueAndValidity();
  }

  signUp() {
    if (this.signUpForm.valid) {
      let formData: any = new FormData();
      formData.append('name', this.signUpForm.get('name').value);
      formData.append('email', this.signUpForm.get('email').value);
      formData.append('password', this.signUpForm.get('password').value);
      formData.append('profile', this.signUpForm.get('profile').value);

      this.api.register(formData).subscribe(
        (res) => {
          alert('Added Successfully');
          this.signUpForm.reset();
          this.router.navigateByUrl('login');
        },
        (err: any) => {
          if (err.status === 400) {
            console.log('Email Already Exists');
            this.errMsg = true;
          } else {
            console.error('Error during Signup:', err);
          }
        }
      );
    }
  }
}
