// Modules
import { createSelector } from '@ngrx/store';

// Types
import { AppState } from '../reducers';

export const loginSelector = (state:AppState) => state.login;

export const loginSelectorUser = createSelector(loginSelector, (login) => login.user);