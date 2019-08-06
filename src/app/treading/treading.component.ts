import { RestApiService } from 'src/app/services/rest-api.service';
import { Product } from './../services/model/product';
import { Component, OnInit } from '@angular/core';
import { Category } from './../services/model/category';
@Component({
  selector: 'app-treading',
  templateUrl: './treading.component.html',
  styleUrls: ['./treading.component.css']
})
export class TreadingComponent implements OnInit {
  products: Product[]=[];
  productDesc:Product[]=[];
  productLimit:Product[]=[];
  productDescLimit:Product[]=[];
  categoryLimit:Category[]=[];
  constructor(private rest: RestApiService) {
    new Promise((resolve) => {
      // this.loadScript();
      resolve(true);
    });
    this.getproducts();
    this.getProductdesc();
    this.getProdDescLimit();
    this.getProdLimit();
    this.getCategoryLimit();
  }
  getProdLimit(){
    this.rest.getProductlimit()
    .subscribe(res=>{
      console.log(res);
      this.productLimit=res;
      new Promise((resolve)=>{
        this.loadScript('homev3-products-cards-carousel');
        resolve(true);
      });
    });
  }
  getProdDescLimit(){
    this.rest.getProductDesclimit()
    .subscribe(res=>{
      console.log(res);
      this.productDescLimit=res;
      new Promise((resolve)=>{
        this.loadScript();
        resolve(true);
      });
    });
  }
  getproducts() {
    this.rest.getProducts()
      .subscribe(res => {
        console.log(res);
        this.products = res;
        new Promise((resolve) => {
          // this.loadScript('home-v3-owl-carousel-tabs');
          this.loadScript('products-carousel-with-umage');
          resolve(true);           
        });
      });
  }
  getProductdesc() {
    this.rest.getProductDesc()
      .subscribe(res => {
        console.log(res);
        this.productDesc = res;
        new Promise((resolve) => {
          this.loadScript('home-v3-owl-carousel-tabs');
          resolve(true);           
        });
      });
  } 

  getCategoryLimit(){
    this.rest.getCategorylimit()
    .subscribe(res=>{
      console.log(res);
      this.categoryLimit=res;
      new Promise((resolve)=>{
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
        document.getElementsByTagName('body')[0].appendChild(node);
      }
    }
  }

  // public loadScript() {
  //   var isFound = false;
  //   var scripts = document.getElementsByTagName("script")
  //   for (var i = 0; i < scripts.length; ++i) {
  //     if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("electro")) {
  //       // isFound = true;
  //     }
  //   }

  //   if (!isFound) {
  //     var dynamicScripts = ["../assets/js/electro.js"];

  //     for (var i = 0; i < dynamicScripts.length; i++) {
  //       let node = document.createElement('script');
  //       node.src = dynamicScripts[i];
  //       node.type = 'text/javascript';
  //       node.async = false;
  //       node.charset = 'utf-8';
  //       document.getElementsByTagName('head')[0].appendChild(node);
  //     }

  //   }
  // }

}

