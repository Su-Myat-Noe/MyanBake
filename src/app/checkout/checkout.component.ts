import { environment } from 'src/environments/environment';
import { ShoppingCartService } from './../services/cart.service';
import { Shipping } from './../services/model/shipping';
import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { RestApiService } from './../services/rest-api.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
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
  countries: any[] = [];
  townships: any[] = [];
  cities: any[] = [];
  saveData:any;
  isInit: boolean = true;
  checkoutType = 'addToCart';

  constructor(
    private rest: RestApiService, 
    private router: Router, 
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private shoppingCart: ShoppingCartService,
    private cartService: CartService<BaseCartItem>) 
    {
      new Promise((resolve) => {
        this.loadScript();
        resolve(true);
      });
      this.getCart();
      this.subTotal();
      this.grandtotalCost();
      this.checkoutData = {};
      this.error = {};
      this.getCountry();
      this.getLogin();
      this.rest.getOrders().subscribe((results) => {
        console.log('results');
        console.log(results);
      },
        error => {
          this.disableSubmit = false;
        });
        this.checkoutType = this.activatedRoute.snapshot.queryParamMap.get('checkout-type');
        if (this.checkoutType === 'buyNow') {
            const item: BaseCartItem = JSON.parse(localStorage.getItem(environment.buyNowKey));
            if (item) {
                console.log(localStorage.getItem(environment.buyNowKey));
                this.carts.push(item);
                this.getTotal();
            } else {
                this.router.navigate(['/']);
            }
        } else {
            this.carts = this.cartService.getItems();
            this.shoppingCart.changedCartService$.subscribe((changed) => {
                if (changed) {
                    this.carts = this.cartService.getItems();
                }
            });

        }
    }
  ngOnInit() {
  }
  getTotal() {
    this.total = 0;
    this.carts.forEach(cart => {
        this.total += (cart.quantity) * (cart.data.itemdt_price);
        console.log('Item detail price' + cart.data.itemdt_id);
    });
    
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
    else if (this.checkoutData.country_id == undefined || this.checkoutData.country_id == '') {
      this.error.country = 'The country field is required';
      valid = false;
  }
  else if (this.checkoutData.city_id == undefined || this.checkoutData.city_id == '') {
      this.error.city = 'The city field is required';
      valid = false;
  }
  else if(this.checkoutData.township_id == undefined || this.checkoutData.township_id == '') {
      this.error.township = 'The township field is required';
      valid = false;
  }
  else if (this.checkoutData.zip_code == undefined || this.checkoutData.zip_code == '') {
      this.error.zip_code = 'The zip_code field is required';
      valid = false;
  }
    return valid;
  }

  saveShipping(){
    this.disableSubmit = true;
        if (this.checkValidateForm()) {
            this.saveData['user_id'] = this.user.id;
            // this.order.customer_id = this.user.id;
            this.rest.saveShipping(this.saveData).subscribe((results) => {
                    alert('You have successfully save address');
                    this.disableSubmit = false;
                    // this.router.navigateByUrl('/check-out?address=' + results.id);
                },
                error => {
                    this.disableSubmit = false;
                    alert("Error");
                });
        }
        this.disableSubmit = false;
        alert("Fill Your Data");
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
// checkOut() {
//   if (this.checkValidateForm()) {
//     this.disableSubmit = true;
//     this.rest.postShipping(this.checkoutData).subscribe((results) => {
//       this.disableSubmit = true;
//       this.order.user_id = this.user.id;
//           this.order.customer_id = this.user.id;
//           this.order.total = this.total;
//           this.order.orderdetail = [];
//       for (const cart of this.carts) {
//         let orderdt: any = {
//           item_id: cart.id,
//                   itemdt_id: cart.data.itemdt_id,
//                   title: cart.name,
//                   quantity: cart.quantity,
//                   price: cart.data.itemdt_price,
//                   amount: cart.quantity * cart.data.itemdt_price,
//               };
//               this.order.orderdetail.push(orderdt);
//           }
//       this.rest.save(this.order).subscribe((results) => {
//         this.disableSubmit = false;
//         if (this.checkoutType === 'addToCart') {
//           this.cartService.clear();
//           this.shoppingCart.changedCartService$.next(true);
//       }
//         this.router.navigateByUrl('/confirm?id=' + results.id);
//       },
//         error => {
//           this.disableSubmit = false;
//         });
//     },
//       error => {
//         this.disableSubmit = false;
//         this.error = error;
//         console.log(this.error);
//       });
//   }
// }
// -------------------------------------------------------------------------------------------------------
//   checkOut() {
//     this.disableSubmit = true;
//     if (!this.user) {
//         this.disableSubmit = false;
//         this.router.navigateByUrl('/login?return=' + this.router.url);
//     } else {
//         this.order.user_id = this.user.id;
//         this.order.customer_id = this.user.id;
//         this.order.total = this.total;
//         this.order.discounted = this.shoppingCart.getDiscount();
//         this.order.orderdetail = [];
//         for (const cart of this.carts) {
//             const orderdt: any = {
//                 item_id: cart.id,
//                 itemdt_id: cart.data.itemdt_id,
//                 title: cart.name,
//                 quantity: cart.quantity,
//                 price: cart.data.itemdt_price,
//                 amount: cart.quantity * cart.data.itemdt_price,
//             };
//             this.order.orderdetail.push(orderdt);
//         }
//         console.log(this.order);
//         this.rest.save(this.order).subscribe((results) => {
//                 this.disableSubmit = false;
//                 if (this.checkoutType === 'addToCart') {
//                     this.cartService.clear();
//                     this.shoppingCart.changedCartService$.next(true);
//                 }
//                 this.router.navigateByUrl('/confirm?id=' + results.id);
//             },
//             error => {
//                 this.disableSubmit = false;
//             });
//         this.cartService.clear();
//         this.shoppingCart.changedCartService$.next(true);
//     }
// }
  compareCountry(c1: any, c2: any): boolean {
      return c1 == c2;
  }

  compareCity(c1: any, c2: any): boolean {
      if (c1 == null || c2 == null) {
          return false;
      }
      return c1 == c2;
  }

  compareTownship(c1: any, c2: any): boolean {
      return c1 == c2;
  }

  getCountry() {
    this.rest.get()
        .subscribe(results => {
            this.countries = results;
        });
}

cityChoose() {
    this.townships = [];
    this.rest.getByCity(this.checkoutData.city_id)
        .subscribe(results => {
            this.cdr.detectChanges();
            this.townships = results;
            if (!this.isInit) {
                this.checkoutData.township_id = null;
            }

        });
}

zipcode(){   
    this.rest.getByTownship(this.checkoutData.township_id)
        .subscribe(results => {
            this.cdr.detectChanges();
            this.checkoutData.zip_code = results.postcode;
            if (!this.isInit) {
                this.checkoutData.zip_code = null;
            }

        });
    
}

countryChoose() {
    this.cities = [];
    this.townships = [];
    this.rest.getByCountry(this.checkoutData.country_id)
        .subscribe(results => {
            this.cdr.detectChanges();
            this.cities = results;
            if (!this.isInit) {
                this.checkoutData.city_id = null;
            }
            console.log('choose');
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