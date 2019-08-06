import { CartService, BaseCartItem } from 'ng-shopping-cart';
import { Brand } from './../../services/model/brand';
import { Category } from './../../services/model/category';
import { Component, OnInit } from '@angular/core';
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
    private cartService: CartService<BaseCartItem>) { 
    this.getCategories();
    this.getbrands();
    this.qty = 1;
    this.getCart();
  }
  getCategories() {
    this.rest.getCategories()
        .subscribe(res => {
          console.log(res);
          this.categories = res;
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
  // getSubCategories() {
  //   this.rest.getSubCategories()
  //       .subscribe(res => {
  //         console.log(res);
  //         this.subcategories = res;
  //       });
  // }
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
  }
  ngOnInit() {
  }

}
