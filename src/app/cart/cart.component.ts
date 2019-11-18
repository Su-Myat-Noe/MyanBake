import { ShoppingCartService } from './../services/cart.service';
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
  subtotal = 0;
  shipping = 0;
  tax = 0;
  discount = 0;
  quant: any[];
 

  constructor(
    private rest: RestApiService,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingCart: ShoppingCartService,
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
    var qty = cart.quantity - 1;
    if(qty > 0){
        cart.quantity = qty;
        this.cartService.addItem(cart);
        this.subTotal();
        this.grandtotalCost();
    }
    
}

plus(cart) {
    cart.quantity = cart.quantity + 1;
    this.cartService.addItem(cart);
    this.subTotal();
    this.grandtotalCost();
}
  
  removeItem(id) {
    this.cartService.removeItem(id);
    this.shoppingCart.changedCartService$.next(true);
    this.cdr.detectChanges();
    this.getCart();
    this.subTotal();
    this.grandtotalCost();
}
  grandtotalCost(){
    this.grandprice=this.cartService.totalCost()+this.cartService.getShipping();
  }
  subTotal(){
    this.total+=this.cartService.cost();    
  }

  getCart() {
    this.carts = this.cartService.getItems();
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