import { Product } from './model/product';
import { Subcategory } from './model/subcategory';
import { Category } from './model/category';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry,map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Productdetail } from './model/productdetail';

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
 
  getProductDetails(): Observable<Productdetail[]> {
    let httpHeader = {
      Accept: 'application/json',
      Authorization: 'Bearer '+ localStorage.getItem(environment.token_key)
    }
    return this.http.get<Productdetail[]>(this.apiUrl + '/api/productdetails', {headers: httpHeader})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
// -------------------------------------------------------------------
// getdata(): Observable<Subcategory[]>{
//   return this.http.get<Subcategory[]>(this.apiUrl + '/api/subcategory').pipe(
//     map(model=>{
//       const items=model.data.items.filter(item=>item.type==='video');
//       model.data.items=items;
//       return model;
//     }),
//     catchError(error=> console.error(error))
//   )
// }
// -------------------------------------------------------------------




  // getProduct(id): Observable<Product> {
  //   return this.http.get<Product>(this.apiUrl + '/product/' + id)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // }

  // createProduct(product):Observable<Product>
  // {
  //   return this.http.post<Product>(this.apiUrl+'/product/',JSON.stringify(product),this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // UpdateProduct(id, product): Observable<Product> {
  //   return this.http.put<Product>(this.apiUrl + '/product/' + id, JSON.stringify(product), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // }

  // deleteProduct(id){
  //   return this.http.delete<Product>(this.apiUrl+'/product/'+id,this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

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
