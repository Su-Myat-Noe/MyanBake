import { AuthService } from './../../../services/auth.service';

// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { tap, withLatestFrom, filter, mergeMap } from 'rxjs/operators';
import { of, Observable, defer } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, Register, UserRequested, UserLoaded, UserVerify } from '../_actions/auth.actions';

import { AppState } from '../../reducers';
import { environment } from '../../../../environments/environment';
import { isUserLoaded } from '../_selectors/auth.selectors';

@Injectable()
export class AuthEffects {
    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(action => {
            console.log('login');
            localStorage.setItem(environment.appAuthTokenKey, action.payload.authToken);
            if(action.payload.isVertify){
                this.store.dispatch(new UserRequested());
            }
        }),
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            localStorage.removeItem(environment.appAuthTokenKey);
            localStorage.removeItem(environment.loginUserKey);
            this.router.navigateByUrl('');
        })
    );

    @Effect({ dispatch: false })
    vertify$ = this.actions$.pipe(
        ofType<UserVerify>(AuthActionTypes.UserVerify),
        tap((action) => {
            localStorage.setItem(environment.isVertifyKey, `${action.payload.is_verify}`);
            this.router.navigateByUrl('');
        })
    );

    @Effect({ dispatch: false })
    register$ = this.actions$.pipe(
        ofType<Register>(AuthActionTypes.Register),
        tap(action => {
            localStorage.setItem(environment.appAuthTokenKey, action.payload.authToken);
        })
    );

    @Effect({ dispatch: false })
    loadUser$ = this.actions$
        .pipe(
            ofType<UserRequested>(AuthActionTypes.UserRequested),
            tap(() => {
                let _user = localStorage.getItem(environment.loginUserKey);
                console.log('user loaded');
                if (_user) {
                    this.store.dispatch(new UserLoaded({ user: JSON.parse(_user) }));
                } else {
                    this.store.dispatch(new Logout());
                }
            })
        );

    @Effect()
    init$: Observable<Action> = defer(() => {
        const userToken = localStorage.getItem(environment.appAuthTokenKey);
        const isVertify = localStorage.getItem(environment.isVertifyKey);
        let observableResult = of({ type: 'NO_ACTION' });
        if (userToken && isVertify=='true') {
            observableResult = of(new Login({ authToken: userToken,isVertify:true }));
        }
        return observableResult;
    });

    constructor(private actions$: Actions,
        private router: Router,
        private auth: AuthService,
        private store: Store<AppState>) { }
}
