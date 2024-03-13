import { environmentClass } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environmentClass.api;
  constructor(private http: HttpClient) {}
  // Register || SignUP
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }
  // Login
  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // uploadImage(formData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/uploads`, formData);
  // }

  userVerify(): Observable<any> {
    const token = Cookies.get('jwt');
    console.log('hey');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/user-verify`, { headers: headers });
  }
}
