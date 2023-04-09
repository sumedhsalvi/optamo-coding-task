import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/app-services/login-service';

/** A toolbar component for the navigation menu. */
@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent implements OnInit {

  /**
   * Creates an instance of `NavToolbarComponent`.
   * @param loginService - The login service used to manage authentication tokens.
   * @param router - The router used for navigating to different pages.
   */
  constructor(readonly loginService: LoginService, readonly router: Router) { }

  /** Angular lifecycle hook that is called when the component is initialized */
  ngOnInit(): void {
  }

  /**
   * Logs out the currently logged in user by clearing the authentication token
   * and navigating to the login page.
   */
  logoutUser() {
    this.loginService.setToken('');
    this.router.navigate(['/login']);
  }

}
