import { Component, OnInit } from '@angular/core';
import{ Category } from './../services/model/category';
import { RestApiService } from 'src/app/services/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { Router, Event,NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  catdetail:Category[]=[];
  id: any;
    constructor(private rest: RestApiService, private route: ActivatedRoute, private router: Router) {
      new Promise((resolve) => {
        this.loadScript();
        resolve(true);
      });
      
      router.events.subscribe( (event: Event) =>{ 
              if (event instanceof NavigationEnd) {
                this.id = this.route.snapshot.paramMap.get("id")
                this.getCategoryDetail(this.id);                
              }
          });          
    }
  
  getCategoryDetail(id: number) {
    this.rest.getCategoryDetail(id)
      .subscribe(res => {
        console.log(res);
        this.catdetail = res;
        new Promise((resolve) => {
          this.loadScript();
          resolve(true);
        });
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
      var dynamicScripts = ["../assets/js/"+script+".js"];
      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('header')[0].appendChild(node);
      }
    }
  }

}
