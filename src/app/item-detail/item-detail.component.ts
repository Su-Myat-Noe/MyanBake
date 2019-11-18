import { ShoppingCartService } from './../services/cart.service';
import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Component, OnInit } from '@angular/core';
import { Product } from './../services/model/product';
import { RestApiService } from 'src/app/services/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {


  products: Product[] = [];    
  productdetail: Product;
  item: Product[] = [];
  productLimit: Product[] = [];
  id: any;
  qty:any;
  productcart: Product;
  loading: any;
  constructor(
    private rest: RestApiService,
    private route: ActivatedRoute,
    private router: Router,
    private shoppingCart: ShoppingCartService,
    private cartService: CartService<BaseCartItem>
  ) {
    
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);      
    });
    this.qty = 1;
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.id = this.route.snapshot.paramMap.get("id")
        this.getproducts();
        this.getProductDetail(this.id);
        this.getitem();
        this.getprolimits();
        window.scrollTo(0, 0);
      }
    });
  }
  getproducts() {
    this.rest.getProducts()
      .subscribe(res => {
        console.log(res);
        this.products = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
  }

  getprolimits() {
    this.rest.getprolimit()
      .subscribe(res => {
        console.log(res);
        this.productLimit = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
  }
  getitem() {
    this.rest.getItemlimit()
      .subscribe(res => {
        console.log(res);
        this.item = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
  }

  getProductDetail(id: number) {
    this.rest.getProductDetail(id)
      .subscribe(res => {
        console.log(res);
        this.productdetail = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
      });
  }

  ngOnInit() {

  }  
  // -----------------------------------------------------------------------------
  // increment product qty
  incrementQty() {
  console.log(this.qty+1);
  this.qty += 1;
  }
  
  // decrement product qty
  decrementQty() {
  if(this.qty-1 < 1 ){
  this.qty = 1
  console.log('1->'+this.qty);
  }else{
  this.qty -= 1;
  console.log('2->'+this.qty);
  }
  } 

  addToCart() {
    var detail = [];
    detail = this.productdetail.productdetail;
    const item = new BaseCartItem(
      {id: this.productdetail.id, 
      name: this.productdetail.name,
      price: detail[0].price,
      image: this.productdetail.image, 
      quantity: this.qty
      });
    this.cartService.addItem(item);
    console.log(this.cartService.getItems());
  }

//   addToCart(id) {
//     var detail = [];
    
//     this.loading = true;
//     this.rest.getProductDetail(id)
//         .subscribe(results => {
//             this.loading = false;
//             this.productcart = results;
//             detail = this.productcart.productdetail;
//             const item = new BaseCartItem();
//             item.setId(this.productcart.id);
//             item.setName(this.productcart.name);
//             item.setPrice(detail[0].price);
//             item.setQuantity(1);
//             item.setImage(this.productcart.image);
//             this.cartService.addItem(item);
//             this.shoppingCart.changedCartService$.next(true);
//         });
// }
// ---------------------------------------------------------------------------------------
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
