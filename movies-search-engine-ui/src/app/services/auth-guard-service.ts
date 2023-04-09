import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login-service';

/** A guard that checks if the user is authenticated before allowing access to protected routes */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Creates an instance of `AuthGuard`.
   * @param authService - The login service used to manage authentication tokens.
   * @param router - The router used for navigating to different pages.
   */
  constructor(private authService: LoginService, private router: Router) { }

  /**
   * Checks if the user is authenticated before allowing access to the requested route.
   * @param route - The requested route.
   * @param state - The current router state.
   * @returns `true` if the user is authenticated, otherwise `false`.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    /** Check if the user is logged in by calling the AuthService */
    if (this.authService.isLoggedIn()) {
      console.log('User LoginIN')
      return true;
    }

    /** If the user is not logged in, redirect to the login page */
    this.router.navigate(['/login']);
    console.log('User not valid');
    return false;
  }
}
