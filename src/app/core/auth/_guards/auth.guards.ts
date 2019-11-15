import { AuthService } from 'src/app/services/auth.service';
// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of, interval } from 'rxjs';
import { tap, map, delay } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors
import { AppState } from '../../../core/reducers/';
import { isLoggedIn } from '../_selectors/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router, private authService: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store
            .pipe(
                delay(300),
                select(isLoggedIn),
                map((result: any) => {
                    return result[0] == true && result[1]==true;
                }),
                tap(x => {
                    if(!x) {
                        this.router.navigateByUrl('/login');
                        return false;
                    }
                })
            );
    }
}
