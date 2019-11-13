import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
// import {IonicStorageModule} from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host: string;
  isLogin: boolean = false;
  isLogin$: Subject<any> = new Subject<any>();
  changeLanguage$: Subject<string> = new Subject<string>();
  constructor
  (
    private http: HttpClient,
    // private storage: IonicStorageModule,
  ) 
  {
    this.host = environment.host;
  }
  getAccessToken(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    const data = {
        'grant_type': 'client_credentials',
        'client_id': environment.client_id,
        'client_secret': environment.client_secret,
    };
    return this.http.post<any>(this.host + '/oauth/token', data, httpOptions);
}

public getLoginUser() {
    return localStorage.getItem(environment.loginUserKey);
}

public logout() {
    this.isLogin$.next(false);
    return localStorage.removeItem(environment.loginUserKey);
}

public isAuthenticated() {
    if (localStorage.getItem(environment.loginUserKey))
        return true;
    else
        return false;
}
}
