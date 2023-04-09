import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthTokenModel } from 'src/app/app-model/auth-token-model';
import { LoginService } from 'src/app/app-services/login-service';

/** LoginComponent is a component responsible for rendering a login form and submitting the credentials to authenticate the user */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Creates an instance of LoginComponent.
   * @param {LoginService} loginService - The LoginService used to authenticate the user.
   * @param {Router} router - The Router used to navigate to different pages.
   */
  constructor(readonly loginService: LoginService, private router: Router) { }

  /** The FormGroup containing two FormControls for the username and password inputs */
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  /** An event emitter that fires when the login form is submitted */
  @Output() submitEM = new EventEmitter();

  /** An error message to be displayed on the screen if the authentication fails */
  @Input() error: string | null;

  /** Initializes the component */
  ngOnInit(): void {
  }

  /**
   * Submits the login form and authenticates the user.
   * If the authentication succeeds, the user is redirected to the dashboard.
   * If the authentication fails, an error message is displayed on the screen.
   */
  submit() {
    if (this.form.valid) {
      const result = this.loginService.login(this.form.get('username')?.value, this.form.get('password')?.value);

      result.subscribe((data: AuthTokenModel) => {
        console.log('auth sucess: '+ data.token);
        this.loginService.setToken(data.token);
        this.router.navigate(['dashboard']);

      }, (error) => {
        this.loginService.setToken('');
        console.log('Auth Error');
        this.error = 'Invalid username or password';
      })
    }
  }
}

