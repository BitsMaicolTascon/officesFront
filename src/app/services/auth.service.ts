import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginResponse } from '../models/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers: any;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
   }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.url}users/login`, {
      email,
      password,
    }, { headers: this.headers });
  }

  setTokenAuth(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getTokenUser(): string {
    return String(localStorage.getItem('accessToken'));
  }

  logout(){
    localStorage.removeItem('accessToken');
  }


}
