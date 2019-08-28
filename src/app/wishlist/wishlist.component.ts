import { Product } from './../services/model/product';
import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  productdetail: Product;
  constructor(private cartService: CartService<BaseCartItem>) {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit() {
  }
  addToWishlist() {
    const item = new BaseCartItem(
      {id: this.productdetail.id, 
      name: this.productdetail.name,
      // price: this.productdetail.ProductDetail[0].price, 
      image: this.productdetail.image,
      });
    this.cartService.addItem(item);
    console.log(this.cartService.getItems());
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

