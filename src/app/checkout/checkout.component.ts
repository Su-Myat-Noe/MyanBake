import { Township } from './../services/model/township';
import { State } from './../services/model/state';
import { Country } from './../services/model/country';
import { Shipping } from './../services/model/shipping';
import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { RestApiService } from './../services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  carts: any;
  total: any = 0;
  grandprice: any;
  isLogin: boolean = false;
  checkoutData: any;
  disableSubmit: boolean = false;
  error: any;
  user: any;
  ship: Shipping;
  order: any = {};
  shippingRate: number = 500;
  countries:Country[]=[];
  states:State[]=[];
  township:Township[]=[];
  constructor(private rest: RestApiService, private router: Router, private cartService: CartService<BaseCartItem>) {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    this.getCart();
    this.subTotal();
    this.grandtotalCost();
    this.checkoutData = {};
    this.error = {};
    this.getLogin();
    this.getCountry();
    this.getState();
    this.getTown();
    this.rest.getOrders().subscribe((results) => {
      console.log('results');
      console.log(results);
    },
      error => {
        this.disableSubmit = false;
      });
  }
  ngOnInit() {
  }
  getCart() {
    this.carts = this.cartService.getItems();
  }
  grandtotalCost() {
    this.grandprice = this.cartService.totalCost() + this.cartService.getShipping();
  }
  subTotal() {
    this.total = this.cartService.cost();
  }
  getCountry() {
    this.rest.getCountry()
        .subscribe(res => {
          this.countries = res;
          new Promise((resolve) => {
            this.loadScript();
            resolve(true);       
          });
        });
  }
  getState() {
    this.rest.getState()
        .subscribe(res => {
          this.states = res;
          new Promise((resolve) => {
            this.loadScript();
            resolve(true);         
          });
        });
  }
  getTown() {
    this.rest.getTown()
        .subscribe(res => {
          this.township = res;
          new Promise((resolve) => {
            this.loadScript();
            resolve(true);         
          });
        });
  }
  getLogin() {
    this.user = this.rest.getStoreUser();
    this.checkoutData.userid = this.user.id;
    this.checkoutData.name = this.user.username;
    this.checkoutData.email = this.user.email;  
  }
  checkValidateForm() {
    var valid = true;
    this.error = [];

    if (this.checkoutData.name == '' || this.checkoutData.name == null) {
      this.error.name = 'The Name field is require';
      valid = false
    }
    else if (this.checkoutData.email == '' || this.checkoutData.email == null) {
      this.error.email = 'The Email field is require';
      valid = false
    }
    else if (this.checkoutData.phone == '' || this.checkoutData.phone == null) {
      this.error.phone = 'The Phone field is require';
      valid = false
    }    
    else if (this.checkoutData.streetaddress == '' || this.checkoutData.streetaddress == null) {
      this.error.streetaddress = 'The Street address field is require';
      valid = false
    }
    else if (this.checkoutData.country == '' || this.checkoutData.country == null) {
      this.error.country = 'Please choose country';
      valid = false
    }
    else if (this.checkoutData.city == '' || this.checkoutData.city == null) {
      this.error.city = 'Please choose city';
      valid = false
    }
    else if (this.checkoutData.state == '' || this.checkoutData.state == null) {
      this.error.state = 'Please choose state';
      valid = false
    }
    else if (this.checkoutData.postcode == '' || this.checkoutData.postcode == null) {
      this.error.postcode = 'The Postcode field is require';
      valid = false
    }
    return valid;
  } 
  checkOut() {
    if (this.checkValidateForm()) {
      this.disableSubmit = true;
      this.rest.postShipping(this.checkoutData).subscribe((results) => {
        this.disableSubmit = true;
        this.order.customer_id = this.user.id;
        this.order.sub_total = this.total;
        this.order.total = this.total + this.shippingRate;
        this.order.shipping_id = results.id;
        this.order.orderdetails = [];
        for (const cart of this.carts) {
          let orderdt: any = {
            product_id: cart.id,
            qty: cart.quantity,
            price: cart.price,
            amount: cart.quantity * cart.price,
          };
          this.order.orderdetails.push(orderdt);
        }
        // this.rest.save(this.order).subscribe((results) => {
        //   this.disableSubmit = false;
        //   this.cartService.clear();
        //   this.router.navigateByUrl('/confirm?id=' + results.id);
        // },
        //   error => {
        //     this.disableSubmit = false;
        //   });
      },
        error => {
          this.disableSubmit = false;
          this.error = error;
          console.log(this.error);
        });
    }
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
