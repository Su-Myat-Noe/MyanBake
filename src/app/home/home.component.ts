import { Router } from '@angular/router';
import { ShoppingCartService } from './../services/cart.service';
import { BaseCartItem, CartService } from 'ng-shopping-cart';
import { Category } from './../services/model/category';
import { Product } from './../services/model/product';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class homeComponent implements OnInit {
  products: Product[] = [];
  product: Product[] = [];
  productcart: Product;
  productDescLimit: Product[] = [];
  productAsc: Product[] = [];
  oneProduct: Product;
  productDesc: Product[] = [];
  categories: Category[] = [];
  loading: any;
  product1: any = {};
  constructor(
    private rest: RestApiService,
    private shoppingCart: ShoppingCartService,
    private router: Router,
    private cartService: CartService<BaseCartItem>) {

    new Promise((resolve) => {
      // this.loadScript();
      resolve(true);
    });    
    this.getproducts();
    this.getproductlimit();
    this.getproductlimitDesc();
    this.getoneProduct();
    this.getProductAsclimit();
    this.getProductDesclimit();
    this.getCategoryheader();    
  }

  getproducts() {
    this.rest.getProducts()
      .subscribe(res => {
        this.products = res;
        new Promise((resolve) => {
          this.loadScript('recently-added-products-carousel');
          resolve(true);
        });
      });
  }

  getCategoryheader() {
    this.rest.getCategoryheader()
      .subscribe(res => {
        this.categories = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
  }
  getProductAsclimit() {
    this.rest.getProductAsclimit()
      .subscribe(res => {
        this.productAsc = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
  }

  getProductDesclimit() {
    this.rest.getProductDesclimit()
      .subscribe(res => {
        this.productDesc = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
  }


  getoneProduct() {
    this.rest.getoneProduct()
      .subscribe(res => {
        this.oneProduct = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
  }
  getproductlimitDesc() {
    this.rest.getproductlimitDesc()
      .subscribe(res => {
        this.productDescLimit = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
  }
  getproductlimit() {
    this.rest.getproductlimit()
      .subscribe(res => {
        this.product = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
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
      var dynamicScripts = ["../assets/js/" + script + ".js"];
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