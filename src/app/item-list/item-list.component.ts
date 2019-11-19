import { BaseCartItem, CartService } from 'ng-shopping-cart';
import { ShoppingCartService } from './../services/cart.service';
import { Product } from './../services/model/product';
import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  products: Product[]=[];
  productLimit:Product[]=[];
  productcart: Product;
  loading: any;
  constructor(private rest: RestApiService,
    private shoppingCart: ShoppingCartService,    
    private cartService: CartService<BaseCartItem>) {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    this.getproduct();
    this.getpro18();
  }
  getproduct() {
    this.rest.getProducts()
      .subscribe(res => {
        console.log(res);
        this.products = res;
        new Promise((resolve) => {
          this.loadScript('product-category-carousel');
          resolve(true);           
        });
      });
    }
   
  getpro18(){
    this.rest.getProduct18()
      .subscribe(res => {
        console.log(res);
        this.productLimit = res;
        new Promise((resolve) => {
          this.loadScript('product-category-carousel');
          resolve(true);           
        });
      });
  }
  ngOnInit() {
  }
  addToCart(id) {
    var detail = [];
    
    this.loading = true;
    this.rest.getProductDetail(id)
        .subscribe(results => {
            this.loading = false;
            this.productcart = results;
            detail = this.productcart.productdetail;
            const item = new BaseCartItem();
            item.setId(this.productcart.id);
            item.setName(this.productcart.name);
            item.setPrice(detail[0].price);
            item.setQuantity(1);
            item.setImage(this.productcart.image);
            this.cartService.addItem(item);
            this.shoppingCart.changedCartService$.next(true);
        });
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
  
}
