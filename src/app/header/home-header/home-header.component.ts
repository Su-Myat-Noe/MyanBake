import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Category } from './../../services/model/category';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../core/reducers';
import {currentUser} from './../../core/auth/_selectors/auth.selectors';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  categories: Category[] = [];
  qty:any;
  carts:any;
  user: any;
  constructor(
    private rest: RestApiService,   
    private cdr: ChangeDetectorRef,
    private cartService: CartService<BaseCartItem>,
    private store: Store<AppState>) {
    new Promise((resolve) => {
      // this.loadScript();
      resolve(true);
    });
    this.getCurrentUser();
    this.getCart();
    this.qty = 1;
    this.getCategoryheader();
  }
  getCurrentUser() {
    this.store
      .pipe(
        select(currentUser),
        map((result: any) => {
          return result;
        })).subscribe((user) => {
          this.user = user; // user;
          console.log('this.login.user');
          console.log(this.user);
        });
  }
  getCategoryheader() {
    this.rest.getCategoryheader()
        .subscribe(res => {
          console.log(res);          
          this.categories = res;
          new Promise((resolve) => {
            this.loadScript('menu-item-has-children');
            resolve(true);           
          });         
        });
  }
  removeItem(cart, idx) {
    this.carts.splice(idx, 1);
    this.cartService.removeItem(cart.id);   
    this.cdr.detectChanges();
  }  
  getCart(){
    this.carts = this.cartService.getItems();
  }
  remove(){
    const item = new BaseCartItem(this.carts);
        this.cartService.removeItem(item.id);
  }
  ngOnInit() {
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
  // public loadScript() {
  //   var isFound = false;
  //   var scripts = document.getElementsByTagName("script")
  //   for (var i = 0; i < scripts.length; ++i) {
  //     if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("electro")) {
  //       isFound = true;
  //     }
  //   }

  //   if (!isFound) {
  //     var dynamicScripts = ["../assets/js/electro.js"];

  //     for (var i = 0; i < dynamicScripts.length; i++) {
  //       let node = document.createElement('script');
  //       node.src = dynamicScripts[i];
  //       node.type = 'text/javascript';
  //       node.async = false;
  //       node.charset = 'utf-8';
  //       document.getElementsByTagName('head')[0].appendChild(node);
  //     }

  //   }
  // }

}