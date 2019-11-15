import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login } from './../core/auth/_actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../core/reducers';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: any;
  disableSubmit: boolean = false;
  error: any;
  redirect: string;
  constructor(
    private rest: RestApiService,
    private router: Router,
    private store: Store<AppState>) {
    this.loginData = {};
    this.error = {};
  }

  ngOnInit() {
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  checkValidateForm() {
    var valid = true;
    this.error.email = '';
    this.error.password = '';
    this.error.login = '';

    if (this.loginData.email == undefined || this.loginData.email == "") {
      this.error.email = 'The email field is required';
      valid = false
    }
    else {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.loginData.email)) {
        this.error.email = 'The email format is invalid';
        valid = false
      }
    }

    if (this.loginData.password == undefined || this.loginData.password == "") {
      this.error.password = 'The password field is required';
      valid = false
    }

    return valid;
  }
  login() {
    if (this.checkValidateForm()) {
      this.disableSubmit = true;
      this.doLogin(this.loginData.email, this.loginData.password);
    }
  }

  doLogin(email: string, password: string): void {
    this.rest.login({ email, password }).pipe(
      catchError(err => {
        this.error.login = err.error.message;
        return [];
      })
    ).subscribe((user) => {
      localStorage.setItem(environment.appPersonalAuthTokenKey, user.access_token);
      localStorage.setItem(environment.loginUserKey, JSON.stringify(user));
      localStorage.setItem('loginUser', JSON.stringify(user));
      this.store.dispatch(new Login({ user_id: user.id, user: user, isVertify: true, loggedIn: true, profileLoaded: true }));
      alert('You have successfully log-in');
      this.rest.storeUser(user);
      this.disableSubmit = false;
      if (this.redirect) {
        this.router.navigateByUrl(this.redirect);
      } else {
        this.router.navigateByUrl('');
      }
    },
      error => {
        this.disableSubmit = false;
        this.error.login = error.error.message;
      });
  }


  public loadScript(script: string = 'electro') {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes(script)) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = ["../assets/js/" + script + ".js"];
      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);
      }
    }
  }
}
