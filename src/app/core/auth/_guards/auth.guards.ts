// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors
import { AppState} from '../../../core/reducers/';
import { isLoggedIn } from '../_selectors/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router) { 
       
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
        
        return this.store
            .pipe(
                select(isLoggedIn),
                map((result:any)=> { 
                    //&& isValid
                    return result[0]==true && result[1]==true ;
                }),
                tap(loggedIn => {
                    if (loggedIn == false) {
                        this.router.navigateByUrl('/login');
                    }
                })
            );
    }
}
