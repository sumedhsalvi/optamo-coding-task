import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login-service';
import { Router } from '@angular/router';
import { AuthTokenModel } from '../model/auth-token-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(readonly loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      // this.submitEM.emit(this.form.value);
      const result = this.loginService.login(this.form.get('username')?.value, this.form.get('password')?.value);

      result.subscribe((data: AuthTokenModel) => {
        console.log('auth sucess: '+ data.token);
        this.loginService.setToken(data.token);
        this.router.navigate(['dashboard']);

      }, (error) => {
        this.loginService.setToken('');
        console.log('Auth Error');
        this.router.navigate(['login']);
        // TODO SHOW ERROR MESSAGE ON SCREEN
      })
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}
