import { Productdetail } from './../services/model/productdetail';
import { Product } from './../services/model/product';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';;

declare let $: any;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  productdetails:Productdetail[]=[];
  
  constructor(private rest: RestApiService) {
this.getproductdetail();
    this.getProducts();
  }
  getProducts() {
    this.rest.getProducts()
      .subscribe(res => {
        console.log(res);
        this.products = res;
        new Promise((resolve) => {
          this.loadScript('recommended-product');
          resolve(true);
           
        });

      });
  }

  getproductdetail() {
    this.rest.getProductDetails()
        .subscribe(res => {
          console.log(res);
          this.productdetails = res;
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
