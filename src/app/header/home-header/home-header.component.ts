import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Category } from './../../services/model/category';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  categories: Category[] = [];
  qty:any;
  carts:any;
  constructor(private rest: RestApiService,   
    private cdr: ChangeDetectorRef,private cartService: CartService<BaseCartItem>) {
    new Promise((resolve) => {
      // this.loadScript();
      resolve(true);
    });
    this.getCart();
    this.qty = 1;
    this.getCategoryheader();
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