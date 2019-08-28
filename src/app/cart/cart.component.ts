import { Product } from './../services/model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productdetail: Product;
  qty: any;
  carts: any;
  grandprice:any;
  total:any=0;
  id: any;
  quant: any[];
 

  constructor(
    private rest: RestApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cartService: CartService<BaseCartItem>
  ) {   
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    this.getCart();
    this.subTotal();
    this.grandtotalCost();
  }
  ngOnInit() {
  }
 
  minus(cart) {
    cart.quantity = cart.quantity - 1;
    this.cartService.addItem(cart);
    this.subTotal();
    this.grandtotalCost();
  }

  plus(cart) {
    cart.quantity = cart.quantity + 1;
    this.cartService.addItem(cart);
    this.subTotal();
    this.grandtotalCost();
  }

  removeItem(cart, idx) {
    this.carts.splice(idx, 1);

    this.cartService.removeItem(cart.id);
    this.subTotal();
    this.grandtotalCost();
    this.cdr.detectChanges();
  }

  grandtotalCost(){
    this.grandprice=this.cartService.totalCost()+this.cartService.getShipping();
    console.log(this.grandprice);
  }
  subTotal(){
    this.total=this.cartService.cost();
    console.log(this.total);
  }

  getCart() {
    this.carts = this.cartService.getItems();
    console.log(this.carts);
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

// ----------------------------------Total Amount--------------------------------------------
  // getTotalAmount(): Observable<number> {
  //   return this.itemsInCartSubject.map((items: Product[]) => {
  //     return items.reduce((prev, curr: Product) => {
  //       return prev + curr.price;
  //     }, 0);
  //   });
  // }
// ----------------------------------Total Amount--------------------------------------------