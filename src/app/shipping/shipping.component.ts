import { Router } from '@angular/router';
import { RestApiService } from './../services/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  saveData: any;
  disableSubmit: boolean = false;
  error: any;
  user:any;
  constructor(private rest: RestApiService, private router: Router) {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    this.saveData = {};
    this.error = {};
    this.getLogin();
  }
  getLogin() 
  {
    this.user = this.rest.getStoreUser();
    this.saveData.userid=this.user.id;
  }
  register() {
    if (this.validForm()) {
      this.disableSubmit = true;
      this.saveData.first_name = 'a';
      this.saveData.last_name = 'b';
      this.saveData.active = 1;
      this.saveData.phone = this.saveData.country + ' ' + (this.saveData.phone) ? this.saveData.phone : '';
      this.rest.register(this.saveData).subscribe((results) => {
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

    if(this.saveData.username == '' || this.saveData.username == null){
      this.error.username = 'The username field is require';
      valid = false
    }
    else if(this.saveData.phone=='' || this.saveData.phone==null){
      this.error.phone = 'The phone field is require';
      valid = false
    }
    else if(this.saveData.country=='' || this.saveData.country==null){
      this.error.country = 'The country field is require';
      valid = false
    }    
    else if(this.saveData.email=='' || this.saveData.email==null){
      this.error.email = 'The email field is require';
      valid = false
    }
    else if(this.saveData.password=='' || this.saveData.password==null ){
      this.error.password = 'The password field is require';
      valid = false
    }
    else if(this.saveData.confirmpassword=='' || this.saveData.confirmpassword==null ){
      this.error.confirmpassword = 'The confirmpassword field is require';
      valid = false
    }
    else if(this.saveData.password!==this.saveData.confirmpassword){
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

