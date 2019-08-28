import { Component } from '@angular/core';
import { RestApiService } from './services/rest-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Electronic';

  constructor(rest: RestApiService) {
    rest.getAccessToken({
      client_id: '4294967295',
      client_secret: 'bI/XITlFlrZHcxsO47qi6WwflP7Gt1pqtzN1BnkVNwU=',
      grant_type: 'client_credentials'
    }).subscribe(res => {
      console.log(res);
      localStorage.setItem(environment.token_key, res.access_token);
    });
    
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
        document.getElementsByTagName('body')[0].appendChild(node);
      }

    }
  }
}
