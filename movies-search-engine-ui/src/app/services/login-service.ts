import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenModel } from '../model/auth-token-model';
import { Router } from '@angular/router';

/** A service for managing user authentication and authorization */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:5000/login';

  /**
   * Creates an instance of `LoginService`.
   * @param http - The HTTP client used for making API requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Logs in the user with the specified credentials.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns An observable that emits an authentication token if the login is successful.
   */
  login(username: string, password: string) {
    const credentials = btoa(`${username}:${password}`); // encode credentials in base64
    const headers = { Authorization: `Basic ${credentials}` };
    return this.http.post<AuthTokenModel>(this.apiUrl, {}, { headers })
  }

  /**
   * Sets the authentication token in the local storage.
   * @param token - The authentication token to store.
   */
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  /**
   * Checks if the user is currently logged in.
   * @returns `true` if the user is logged in, otherwise `false`.
   */
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    const result =  token !== null && token !== '';
    console.log('result' + token);
    return result;
  }
}
