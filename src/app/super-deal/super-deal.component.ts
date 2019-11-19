import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { ShoppingCartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from './../services/model/product';
import { RestApiService } from 'src/app/services/rest-api.service';
@Component({
  selector: 'app-super-deal',
  templateUrl: './super-deal.component.html',
  styleUrls: ['./super-deal.component.css']
})
export class SuperDealComponent implements OnInit {
  products: Product[]=[];
  loading: any;
  productcart: Product;
  constructor(private rest: RestApiService, private cartService: CartService<BaseCartItem>,
    private shoppingCart: ShoppingCartService) {
    new Promise((resolve) => {
      // this.loadScript();
      resolve(true);
    });
    this.getproducts();
  }
  getproducts() {
    this.rest.getProducts()
      .subscribe(res => {
        console.log(res);
        this.products = res;
        new Promise((resolve) => {
          this.loadScript('home-v2-owl-carousel-tabs');
          this.loadScript('home-v2-categories-products');
          this.loadScript('products-carousel-widget');
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
  // public loadScript(script: string = 'electro') {
  //   var isFound = false;
  //   var scripts = document.getElementsByTagName("script")
  //   for (var i = 0; i < scripts.length; ++i) {
  //     if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("electro")) {
  //       // isFound = true;
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
