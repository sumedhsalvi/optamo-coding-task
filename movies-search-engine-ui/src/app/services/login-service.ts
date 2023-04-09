import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenModel } from '../model/auth-token-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:5000/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const credentials = btoa(`${username}:${password}`); // encode credentials in base64
    const headers = { Authorization: `Basic ${credentials}` };
    return this.http.post<AuthTokenModel>(this.apiUrl, {}, { headers })
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    const result =  token !== null && token !== '';
    console.log('result' + token);
    return result;
  }

}
