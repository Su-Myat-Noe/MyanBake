import { map } from 'rxjs/operators';
import { currentUser } from './../core/auth/_selectors/auth.selectors';
import { AppState } from './../core/reducers/index';
import { Store, select } from '@ngrx/store';
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
  productDescLimit: Product[] = [];
  productAsc: Product[] = [];
  oneProduct: Product;
  productDesc: Product[] = [];
  categories: Category[] = [];
  productcart: Product;
  loading: any;
  user: any;
  product1: any = {};
  wish_list: any[] = [];
  carts: BaseCartItem[] = [];
  loadMore = true;
  page = 1;
  constructor(
    private rest: RestApiService,
    private router: Router,
    private store: Store<AppState>,
    private shoppingCart: ShoppingCartService,    
    private cartService: CartService<BaseCartItem>,
    // private events: Events
   ) {

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
    this.carts = this.cartService.getItems();
    this.shoppingCart.changedCartService$.subscribe((changed) => {
        if (changed) {
            this.carts = this.cartService.getItems();
        }
    });
  //   this.events.subscribe('change_wish_list', (state) => {
  //     this.wish_list = JSON.parse(localStorage.getItem('wish_list'));
  // });
    this.getCurrentUser();
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

  getCurrentUser() {
    this.store
        .pipe(
            select(currentUser),
            map((result: any) => {
                return result;
            })).subscribe((user) => {
                this.user = user;
                this.getMyWishList();
            });
}
getMyWishList() {
  this.loading = true;
  this.wish_list = [];
  localStorage.setItem("wish_list", JSON.stringify(this.wish_list));
  if (this.user) {
      this.rest.getMyWishList(this.user.id).subscribe(data => {
          if (data.length > 0) {
              for (const wish of data) {
                  this.wish_list.push(wish.item_id);
              }
              localStorage.setItem("wish_list", JSON.stringify(this.wish_list));
              this.loading = false;
          }
          else {
              this.loading = false;
          }
      });
  }
  else{
      this.loading = false;
  }
}
arrayRemove(arr, value) {
  return arr.filter(function (ele) {
      return ele != value;
  });
}


postWishList(id) {
  if (this.user) {
      this.loading = true;
      this.rest.checkWishList({
          item_id: id,
          user_id: this.user.id
      }).subscribe(result => {
          if (result.length > 0) {
              this.rest.deleteWishList(result[0].id).subscribe(data => {
                  this.wish_list = this.arrayRemove(this.wish_list, id);
                  localStorage.setItem("wish_list", JSON.stringify(this.wish_list));
                  this.loading = false;
                  // this.events.publish('change_wish_list');
                  // alert('Remove wish list');
              });
          } else {
              this.rest.postWishList({
                  item_id: id,
                  user_id: this.user.id
              }).subscribe(data => {
                  this.wish_list.push(id);
                  localStorage.setItem("wish_list", JSON.stringify(this.wish_list));
                  this.loading = false;
                  // this.events.publish('change_wish_list');
                //  alert('Successfully added to your wish list.');
              });
          }
      });
  } else {
      this.router.navigateByUrl('/login?return=' + this.router.url);
  }
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