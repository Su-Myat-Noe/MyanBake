import { Brand } from './model/brand';
import { Product } from './model/product';
import { Subcategory } from './model/subcategory';
import { Category } from './model/category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry,map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiUrl = 'https://myanmarbake.apitoolz.com';

  constructor(private http: HttpClient) {

  }

  getAccessToken(data): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/oauth/token', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//---------------------------------------------Category----------------------------------------------------------------------
  getCategories(): Observable<Category[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Category[]>(this.apiUrl +'/api/category', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getCategorylimit(): Observable<Category[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Category[]>(this.apiUrl +'/api/category?rows=6', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getCategoryheader(): Observable<Category[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Category[]>(this.apiUrl +'/api/category?rows=7', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getCategoryDetail(id: number): Observable<Category[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Category[]>(this.apiUrl + '/api/category/'+id, {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//-----------------------------------------------SubCategory--------------------------------------------------------------------
  getSubCategories(): Observable<Subcategory[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Subcategory[]>(this.apiUrl + '/api/subcategory', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  } 

//------------------------------------------------------Product-------------------------------------------------------------
// All product 
  getProducts(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl + '/api/product', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getProductID(id:number): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl + '/api/product/'+id, {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

//4 records
  getProductlimit(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl +'/api/product?rows=4', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//18 records
  getProduct18(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl +'/api/product?rows=18', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
// product detail page
  getProductDetail(id: number): Observable<Product> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product>(this.apiUrl + '/api/product/'+id, {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//4 records with descending
  getProductDesc(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl + '/api/product?sort=id&order=desc&rows=4', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//6 records with descending
  getProductDesclimit(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl + '/api/product?sort=id&order=desc&rows=6', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  //6 records with ascending
  getProductAsclimit(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl + '/api/product?rows=6', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//3 records
  getItemlimit(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl + '/api/product?rows=3', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//10 records
  getprolimit(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl + '/api/product?rows=10', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//2 records with descending
  getproductlimitDesc(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl + '/api/product?sort=id&order=desc&rows=2', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//2 records
  getproductlimit(): Observable<Product[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product[]>(this.apiUrl + '/api/product?rows=2', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//get data with id (one record)
  getoneProduct(): Observable<Product> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Product>(this.apiUrl + '/api/product/17', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  

//-----------------------------------------------Brand--------------------------------------------------------------------
  getBrand(): Observable<Brand[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Brand[]>(this.apiUrl + '/api/brand', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getshopBrand(): Observable<Brand[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Brand[]>(this.apiUrl + '/api/brand?rows=8', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
//-------------------------------------------------------------------------------------------------------------------
  handleError(error) {
    let errormessage = '';
    if (error.error instanceof ErrorEvent) {
      errormessage = error.error.message;
    }
    else {
      errormessage = `Error Code:${error.status}\nMessage:${error.message}`
    }
    window.alert(errormessage);
    return throwError(errormessage);
  }
}
