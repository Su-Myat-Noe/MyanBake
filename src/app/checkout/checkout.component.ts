import { map, switchMap } from 'rxjs/operators';
import { currentUser } from './../core/auth/_selectors/auth.selectors';
import { AppState } from './../core/reducers/index';
import { AuthService } from './../services/auth.service';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from './../services/cart.service';
import { Shipping } from './../services/model/shipping';
import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { RestApiService } from './../services/rest-api.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {select, Store} from '@ngrx/store';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user: any;
  shipping: any;
  constructor(
    private rest: RestApiService, 
    private router: Router, 
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private shoppingCart: ShoppingCartService,
    private authService: AuthService,
    private cartService: CartService<BaseCartItem>,
    private store: Store<AppState>
    ) 
    {
      new Promise((resolve) => {
        this.loadScript();
        resolve(true);
      });
     
    }
  ngOnInit() {
  }
  
  getCurrentUser() {
    this.store
    .pipe(
        select(currentUser),
        map((result: any) => {
            console.log('checkout');
            console.log(result);
            this.user = result;
            return result;
        }),
        switchMap(user => {
            if (user) {
                return this.rest.addressSearch(`default:equal:1|user_id:equal:${user.id}|`);
            }
            return [];
        })
        ).subscribe(results => {
            if (results.length > 0) {
                this.shipping = results[0];
            }
        });
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