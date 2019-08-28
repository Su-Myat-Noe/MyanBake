import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Subcategory } from 'src/app/services/model/subcategory';
import { Category } from './../services/model/category';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[]=[];
  qty:any;
  carts:any;
  constructor(private rest: RestApiService,   
    private cdr: ChangeDetectorRef,private cartService: CartService<BaseCartItem>) {
    new Promise((resolve) => {
      // this.loadScript();
      resolve(true);
    });
    this.qty = 1;
    this.getCart();  
    this.getCategoryheader();
    this.getSubCategories();
  }
  getCategoryheader() {
    this.rest.getCategoryheader()
        .subscribe(res => {
          console.log(res);          
          this.categories = res;
          this.loadScript('menu-item-has-children');
          console.log('after binding');
        });
  }
  getSubCategories() {
    this.rest.getSubCategories()
        .subscribe(res => {
          console.log(res);
          this.subcategories = res;
          new Promise((resolve) => {
            this.loadScript();
            resolve(true);           
          });
        });
  }
 // increment product qty
 incrementQty() {
  console.log(this.qty+1);
  this.qty += 1;
  }  
  // decrement product qty
  decrementQty() 
  {
    if(this.qty-1 < 1 )
      {
      this.qty = 1
      console.log('1->'+this.qty);
      }
    else
      {
      this.qty -= 1;
      console.log('2->'+this.qty);
      }
  } 
  getCart(){
    this.carts = this.cartService.getItems();
  }
  removeItem(cart, idx) {
    this.carts.splice(idx, 1);
    this.cartService.removeItem(cart.id);   
    this.cdr.detectChanges();
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
  //       document.getElementsByTagName('body')[0].appendChild(node);
  //     }

  //   }
  // }

}

