// Actions
import { AuthActions, AuthActionTypes } from '../_actions/auth.actions';


export interface AuthState {
    loggedIn: boolean;
    verify: boolean,
    user_id: number,
    user: any
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    verify: false,
    user_id: -1,
    user: null
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login: {
            const _user_id: number = action.payload.user_id;
            const _vertify: boolean = action.payload.isVertify;
            const _user: any = action.payload.user;
            const loggedIn: boolean = action.payload.loggedIn;
            return {
                ...state,
                loggedIn: loggedIn,
                verify: _vertify,
                user_id: _user_id,
                user: _user,
            };
        }

        case AuthActionTypes.Register: {
            const _user: any = action.payload.user;
            return {
                ...state,
                loggedIn: true,
                verify: false,
                user_id: _user.id,
                user: _user,
            };
        }

        case AuthActionTypes.UserVerify: {
            const isVertify: boolean = action.payload.is_verify;
            return {
                ...state,
                verify: isVertify
            };
        }

        case AuthActionTypes.UpdateUser: {
            const _user: any = action.payload.user;
            return {
                ...state,
                user: _user
            };
        }

        case AuthActionTypes.Logout:
            return initialAuthState;

        default:
            return state;
    }
}
