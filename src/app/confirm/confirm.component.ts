import { Order } from './../services/model/order';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  checkoutData: any;
  error: any;
  user: any;
  order: Order[]=[];
  id:any;
  constructor(  private router: Router,private route: ActivatedRoute,private rest: RestApiService) {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
      this.checkoutData = {};
      this.getorder(this.id);
  }

  ngOnInit() {
  }
  getorder(id: number) {
    this.order = this.rest.getStoreOrder(id); 
    // this.order.oid=this.order.id;
    // this.order.email=this.order.email;
    this.checkoutData.id = this.order[1].id;
    this.checkoutData.email = this.user.email;  
  }

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
