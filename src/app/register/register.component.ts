import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData: any;
  disableSubmit: boolean = false;
  error: any;
  constructor(private rest: RestApiService, private router: Router) {
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
      this.registerData.first_name = 'a';
      this.registerData.last_name = 'b';
      this.registerData.active = 1;
      this.registerData.phone = this.registerData.country + ' ' + (this.registerData.phone) ? this.registerData.phone : '';
      this.rest.register(this.registerData).subscribe((results) => {
        // this.storage.set('remember', true);
        // this.storage.set('user', results);
        alert('You have successfully register and log-in');
        this.disableSubmit = false;
        this.router.navigateByUrl('');
      },
        error => {
          this.disableSubmit = false;
          this.error = error.error.message_list;
          console.log(error);
        });
    }
  }
  
  validForm() {
    var valid = true;
    this.error = [];

    if(this.registerData.username == '' || this.registerData.username == null){
      this.error.username = 'The username field is require';
      valid = false
    }
    else if(this.registerData.phone=='' || this.registerData.phone==null){
      this.error.phone = 'The phone field is require';
      valid = false
    }
    else if(this.registerData.country=='' || this.registerData.country==null){
      this.error.country = 'The country field is require';
      valid = false
    }    
    else if(this.registerData.email=='' || this.registerData.email==null){
      this.error.email = 'The email field is require';
      valid = false
    }
    else if(this.registerData.password=='' || this.registerData.password==null ){
      this.error.password = 'The password field is require';
      valid = false
    }
    else if(this.registerData.confirmpassword=='' || this.registerData.confirmpassword==null ){
      this.error.confirmpassword = 'The confirmpassword field is require';
      valid = false
    }
    else if(this.registerData.password!==this.registerData.confirmpassword){
      this.error.confirmpassword = 'The password and confirm password must be same';
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
