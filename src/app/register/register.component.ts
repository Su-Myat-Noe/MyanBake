import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment'; 
import { Store } from '@ngrx/store';
import { AppState } from '../core/reducers';
import { Login } from './../core/auth/_actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData: any;
  disableSubmit: boolean = false;
  error: any;
  redirect: string;
  constructor(private rest: RestApiService, private router: Router, private store: Store<AppState>) {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    this.registerData = {};
    this.error = {};
  }
  register() {
    if (this.validForm()) {
      this.disableSubmit = true;
      let data = {
        username: this.registerData.username,
        email: this.registerData.email,
        phone: this.registerData.phone,
        password: this.registerData.password,
        password_confirmation: this.registerData.confirmpassword
      }
      this.rest.register(data)
        .pipe(
          catchError(err => {
            console.log(err.error[0]);
            return [];
          })
        )
        .subscribe((results) => {
          this.doLogin(data.email, data.password);
          alert("Signup Successfully, Please verify your account ");
        },
          error => {
            this.disableSubmit = false;
          });
    }
  }

  handleError(error) {
    let errormessage = '';
    if (error.error instanceof ErrorEvent) {
      errormessage = error.error.message;
    }
    else {
      errormessage = `Error Code:${error.status}\nMessage:${error.message}`
    }
    console.log(errormessage);
  }

  doLogin(email: string, password: string): void {
    this.rest.login({ email, password }).subscribe((user) => {
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

  verifyPhone(user: any) {
    // (<any>window).AccountKitPlugin.logout();
    // (<any>window).AccountKitPlugin.loginWithPhoneNumber({
    //     useAccessToken: true,
    //     defaultCountryCode: "MM",
    //     initialPhoneNumber: [this.registerData.country, this.registerData.phone],
    //     facebookNotificationsEnabled: true
    // }, (successdata) => {
    //     (<any>window).AccountKitPlugin.getAccount((result) => {
    //         var searchPhone = result.phoneNumber.replace('+', '');
    //         this.rest.search(`phone:like:${searchPhone}|`).subscribe((results) => {
    //             if (results.length == 0) {
    //                 this.rest.register(user).subscribe((results) => {
    //                   alert("Hello")
    //                 },
    //                     error => {
    //                         this.disableSubmit = false;
    //                         this.error.login = JSON.stringify(error.error.message_list);
    //                         alert(JSON.stringify(error.error.message_list));
    //                     });
    //             }
    //             else {
    //                 alert(results[0]);
    //             }
    //         });
    //     });
    // }, (err) => {
    // })
  }


  validForm() {
    var valid = true;
    this.error.username = '';
    this.error.email = '';

    if (this.registerData.username == undefined || this.registerData.username == "") {
      this.error.username = 'The username field is require';
      valid = false
    }
    else if (this.registerData.email == undefined || this.registerData.email == "") {
      this.error.email = 'The email field is require';
      valid = false
    }
    else if (this.registerData.phone == undefined || this.registerData.phone == "") {
      this.error.phone = 'The phone field is require';
      valid = false
    }
    else if (this.registerData.password == '' || this.registerData.password == null) {
      this.error.password = 'The password field is require';
      valid = false
    }
    else if (this.registerData.confirmpassword == '' || this.registerData.confirmpassword == null) {
      this.error.confirmpassword = 'The confirmpassword field is require';
      valid = false
    }
    return valid;
  }


  ngOnInit() {

  }

  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("electro")) {
        // isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = ["../assets/js/electro.js"];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }

}
