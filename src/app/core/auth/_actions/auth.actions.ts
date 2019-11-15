import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    Login = '[Login] Action',
    Logout = '[Logout] Action',
    Register = '[Register] Action',
    UserVerify = '[UserVerify] Action',
    UpdateUser = '[UpdateUser] Action', 
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: { user_id: number, user: any, isVertify: boolean, loggedIn: boolean,profileLoaded:boolean
    }) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: { user: any }) { }
}

export class UserVerify implements Action {
    readonly type = AuthActionTypes.UserVerify;
    constructor(public payload: { is_verify: boolean }) { }
}

export class UpdateUser implements Action {
    readonly type = AuthActionTypes.UpdateUser;
    constructor(public payload: { user: any }) { }
}

export type AuthActions = Login | Logout | Register | UserVerify | UpdateUser ;
