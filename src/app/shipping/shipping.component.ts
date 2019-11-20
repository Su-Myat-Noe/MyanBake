import { map } from 'rxjs/operators';
import { currentUser } from './../core/auth/_selectors/auth.selectors';
import { AppState } from './../core/reducers/index';
import { Store, select } from '@ngrx/store';
import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from './../services/rest-api.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  id: number;
  saveData: any;
  user: any;
  error: any;
  isLogin: boolean = false;
  disableSubmit: boolean = false;
  constructor(
    private rest: RestApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private store:Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    this.saveData = {};
    this.new_edit();
    this.error = {};
    this.getLogin();
  }
  
  new_edit(){
      this.id = this.activatedRoute.snapshot.params.id;
      this.rest.getData(this.id)
        .subscribe(results => {
          this.saveData = results;         
            
        });
    // }
  }

  checkValidateForm() {
    var valid = true;
    this.error.name = '';
    this.error.phone = '';
    this.error.email = '';
    this.error.address = '';

    if (this.saveData.name == undefined || this.saveData.name == "") {
      this.error.name = 'The name field is required';
      valid = false
    }
    if (this.saveData.phone == undefined || this.saveData.phone == "") {
      this.error.phone = 'The phone field is required';
      valid = false
    }
    if (this.saveData.email == undefined || this.saveData.email == "") {
      this.error.email = 'The email field is required';
      valid = false
    }
    else {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.saveData.email)) {
        this.error.email = 'The email format is invalid';
        valid = false
      }
    }
    if (this.saveData.address == undefined || this.saveData.address == "") {
      this.error.address = 'The address field is required';
      valid = false
    }    
    return valid;
  }
  getLogin() {    
    this.isLogin = this.authService.isAuthenticated();
    if (this.isLogin) {
      this.user = JSON.parse(this.authService.getLoginUser());
      this.store
            .pipe(
                select(currentUser),
                map((result: any) => {
                    return result
                })).subscribe(x => this.user = x);
    }
  }
  save() {
    this.disableSubmit = true;
    if (this.checkValidateForm()) {
      this.saveData['Userid'] = this.user.id;
      this.rest.save(this.saveData).subscribe((results) => {
        alert('You have successfully save address');
        this.disableSubmit = false;
        this.router.navigateByUrl('/checkout' + results.id);
      },
        error => {
          this.disableSubmit = false;
        }); 
    }
    this.disableSubmit = false;    
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

