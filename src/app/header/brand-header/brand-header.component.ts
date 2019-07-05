import { Subcategory } from 'src/app/services/model/subcategory';
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
  subcategories: Subcategory[]=[];
  constructor(private rest: RestApiService) { 
    this.getCategories();
    this.getSubCategories();
  }
  getCategories() {
    this.rest.getCategories()
        .subscribe(res => {
          console.log(res);
          this.categories = res;
        });
  }
  getSubCategories() {
    this.rest.getSubCategories()
        .subscribe(res => {
          console.log(res);
          this.subcategories = res;
        });
  }
  ngOnInit() {
  }

}
