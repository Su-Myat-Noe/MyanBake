import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private rest: RestApiService,private router: Router) { 
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

  // login(){
  //   if (this.checkValidateForm()){
  //     this.disableSubmit = true;
  //     this.rest.login(this.loginData).subscribe((results) => {        
  //       localStorage.setItem('remember', this.loginData.remember);
  //       localStorage.setItem('user', results);
  //         alert('You have successfully log-in');
  //         this.disableSubmit = false;
  //         this.router.navigateByUrl('');      
  //     },
  //       error => {          
  //         this.disableSubmit = false;
  //         this.error = error.error.message_list;
  //         console.log(this.error);
  //       });
  //   }
    
  // }
  login() {
    if (this.checkValidateForm()) {
        this.disableSubmit = true;
        this.doLogin(this.loginData.email, this.loginData.password);
    }
}

doLogin(email: string, password: string): void {
    this.rest.login({ email, password }).subscribe((results) => {
        alert('You have successfully log-in');
        this.rest.storeUser(results);
        this.disableSubmit = false;
        if(this.redirect) {
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
      var dynamicScripts = ["../assets/js/"+script+".js"];
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
