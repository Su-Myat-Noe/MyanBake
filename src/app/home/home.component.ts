import { CartComponent } from './../cart/cart.component';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class homeComponent implements OnInit {

  constructor() {
    new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
  }

  ngOnInit() {
  }

  public loadScript() {
    var isFound = false;
    // var scripts = document.getElementsByTagName("script")
    // for (var i = 0; i < scripts.length; ++i) {
    //   if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("electro")) {
    //     isFound = true;
    //   }
    // }

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
