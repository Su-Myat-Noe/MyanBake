// NGRX
import { createSelector } from '@ngrx/store';


export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => [auth.loggedIn, auth.verify]
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);

export const currentUser = createSelector(
    selectAuthState,
    auth => auth.user
);

export const isVerify = createSelector(
    selectAuthState,
    auth => auth.user.is_verify
);
