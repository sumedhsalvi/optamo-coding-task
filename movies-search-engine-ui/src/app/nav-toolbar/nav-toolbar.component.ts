import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss']
})
export class NavToolbarComponent implements OnInit {

  constructor(readonly loginService: LoginService, readonly router: Router) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.loginService.setToken('');
    this.router.navigate(['/login']);
  }

}
