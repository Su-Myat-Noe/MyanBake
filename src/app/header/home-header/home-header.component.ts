import { Subcategory } from './../../services/model/subcategory';
import { Category } from './../../services/model/category';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[]=[];
  constructor(private rest: RestApiService) {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });

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


  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("electro")) {
        isFound = true;
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