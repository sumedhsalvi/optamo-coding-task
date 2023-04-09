import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is logged in by calling the AuthService
    if (this.authService.isLoggedIn()) {
      console.log('User LoginIN')
      return true;
    }

    // If the user is not logged in, redirect to the login page
    this.router.navigate(['/login']);
    console.log('User not valid');
    return false;
  }
}
