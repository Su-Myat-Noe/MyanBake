import { UserVerify, UpdateUser } from './../_actions/auth.actions';
import { AuthService } from 'src/app/services/auth.service';
// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { tap, map, catchError } from 'rxjs/operators';
import { of, Observable, defer, from, forkJoin } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, Register } from '../_actions/auth.actions';

import { AppState } from '../../reducers';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthEffects {

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(action => {
            localStorage.setItem(environment.loginUserKey, JSON.stringify(action.payload.user));
            localStorage.setItem(environment.isVertifyKey, JSON.stringify(action.payload.isVertify));
        }),
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        tap(() => {
            Object.keys(localStorage)
                .filter(x => x != environment.token_key)
                .map(y => localStorage.removeItem(y));
            this.router.navigateByUrl('/tabs/home');
        })
    );

    @Effect({ dispatch: false })
    vertify$ = this.actions$.pipe(
        ofType<UserVerify>(AuthActionTypes.UserVerify),
        tap((action) => {
            localStorage.setItem(environment.isVertifyKey, `${action.payload.is_verify}`);
        })
    );

    @Effect({ dispatch: false })
    updateUser$ = this.actions$.pipe(
        ofType<UpdateUser>(AuthActionTypes.UpdateUser),
        tap((action) => {
            localStorage.setItem(environment.loginUserKey, JSON.stringify(action.payload.user));
        })
    );

    @Effect({ dispatch: false })
    register$ = this.actions$.pipe(
        ofType<Register>(AuthActionTypes.Register),
        tap(action => {
            localStorage.setItem(environment.loginUserKey, JSON.stringify(action.payload.user));
            this.router.navigate(['manage-profile']);
        })
    );

    @Effect()
    init$: Observable<Action> = defer(() => {
        let observableResult = of({ type: 'NO_ACTION' });
        const user = JSON.parse(localStorage.getItem(environment.loginUserKey));
        const isVertify = JSON.parse(localStorage.getItem(environment.isVertifyKey));
        if (user && user.is_verify == 1 && isVertify == true) {
            observableResult = of(new Login({
                user_id: user.id, user: user, isVertify: true, loggedIn: true, profileLoaded: true
            }));
        }
        else if (user && user.is_verify == 1 && isVertify == false) {
            observableResult = of(new Register({ user: user }));
        }
        else {
            observableResult = of(new Logout());
        }
        return observableResult;

    });
    constructor(private actions$: Actions,
        private router: Router,
        private auth: AuthService,
        private store: Store<AppState>
    ) {

    }
}
