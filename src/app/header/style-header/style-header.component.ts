import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Category } from './../../services/model/category';
import { RestApiService } from './../../services/rest-api.service';
import { Brand } from './../../services/model/brand';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-style-header',
  templateUrl: './style-header.component.html',
  styleUrls: ['./style-header.component.css']
})
export class StyleHeaderComponent implements OnInit {
  categories: Category[] = [];
  brands:Brand[]=[];
  qty:any;
  carts:any;
  constructor
  (
    private rest: RestApiService,    
    private cdr: ChangeDetectorRef,
    private cartService: CartService<BaseCartItem>
  ) 
  {
    this.getCategories();
    this.getbrands();
    this.getCart();
  }
  getbrands(){
    this.rest.getBrand()
      .subscribe(res=>{
        console.log(res);
        this.brands=res;
      });
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

}
