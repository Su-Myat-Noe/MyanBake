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
  constructor(private rest: RestApiService) { 
    this.getCategories();
    this.getbrands();
  }
  getCategories() {
    this.rest.getCategories()
        .subscribe(res => {
          console.log(res);
          this.categories = res;
        });
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
  // getproducts(){
  //   this.rest.getProducts()
  //     .subscribe(res=>{
  //       console.log(res);
  //       this.products=res;
  //     });
  // }
  ngOnInit() {
  }

}
