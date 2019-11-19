import { RestApiService } from './../services/rest-api.service';
import { ShoppingCartService } from './../services/cart.service';
import { Product } from './../services/model/product';
import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  productdetail: Product;
  myWishList: any[] = [];
  loadMore = true;
  carts: any;
  loading = false;
  page = 1;
  user: any;
  productcart: Product;
  constructor(
    private rest: RestApiService,
    private cartService: CartService<BaseCartItem>,
    private shoppingCart: ShoppingCartService,
    private cdr: ChangeDetectorRef,) {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    
  }

  ngOnInit() {
  }
viewWishList() {
  this.loading = true;
  this.rest.viewWishList(this.page, this.user.id)
      .subscribe(result => {
          this.myWishList = result;
          this.loading = false;
          if (result.length < 12) {
              this.loadMore = false;
          }
      });
}

deleteWishList(wishlist) {
  this.rest.deleteWishList(wishlist.id).subscribe(results => {
      alert('Remove from your wishlist');
      const idx = this.myWishList.indexOf(wishlist);
      if (idx >= 0) {
          this.myWishList.splice(idx, 1);
          this.cdr.detectChanges();
      }
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

