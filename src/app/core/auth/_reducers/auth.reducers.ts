// Actions
import { AuthActions, AuthActionTypes } from '../_actions/auth.actions';
// Models
import { User } from '../_models/user.model';

export interface AuthState {
    loggedIn: boolean;
    vertify:boolean,
    authToken: string;
    user: User;
    isUserLoaded: boolean;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    vertify:false,
    authToken: undefined,
    user: undefined,
    isUserLoaded: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            const _token: string = action.payload.authToken;
            const _vertify: boolean = action.payload.isVertify;
            return {
                loggedIn: true,
                vertify:_vertify,
                authToken: _token,
                user: undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.Register: {
            const _token: string = action.payload.authToken;
            return {
                loggedIn: true,
                vertify:false,
                authToken: _token,
                user: undefined,
                isUserLoaded: false
            };
        }

        case AuthActionTypes.UserVerify: {
            const isVertify: boolean = action.payload.is_verify;
            let obj= {
                ...state,
               vertify:isVertify
            };
            return obj;
        }

        case AuthActionTypes.Logout:
            return initialAuthState;

        case AuthActionTypes.UserLoaded: {
            const _user: User = action.payload.user;
            return {
                ...state,
                user: _user,
                isUserLoaded: true
            };
        }

        default:
            return state;
    }
}
