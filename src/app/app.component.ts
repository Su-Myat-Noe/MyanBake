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
}
