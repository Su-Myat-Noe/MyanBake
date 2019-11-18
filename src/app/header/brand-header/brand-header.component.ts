import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Brand } from './../../services/model/brand';
import { Category } from './../../services/model/category';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
@Component({
  selector: 'app-brand-header',
  templateUrl: './brand-header.component.html',
  styleUrls: ['./brand-header.component.css']
})
export class BrandHeaderComponent implements OnInit {
  categories: Category[] = [];
  brands:Brand[]=[];
  qty:any;
  carts:any;
  
  constructor(private rest: RestApiService,    
    private cdr: ChangeDetectorRef,
    private cartService: CartService<BaseCartItem>) { 
    this.getCategories();
    this.getbrands();
    this.getCart();
  }
  getCategories() {
    this.rest.getCategories()
        .subscribe(res => {
          console.log(res);
          this.categories = res;
        });
  }
  removeItem(cart, idx) {
    this.carts.splice(idx, 1);
    this.cartService.removeItem(cart.id);   
    this.cdr.detectChanges();
    this.getCart();
  }  
  getbrands(){
    this.rest.getBrand()
      .subscribe(res=>{
        console.log(res);
        this.brands=res;
      });
  }
  getCart(){
    this.carts = this.cartService.getItems();
  }
  remove(){
    const item = new BaseCartItem(this.carts);
    this.cartService.removeItem(item.id);
    this.cdr.detectChanges();
  }
  ngOnInit() {
  }

}
