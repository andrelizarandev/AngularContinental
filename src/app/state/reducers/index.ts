// Modules
import { ActionReducerMap } from '@ngrx/store';

// Reducers
import { InitialStateLoginReducer, loginReducer } from './login.reducer';

export const reducers:ActionReducerMap<AppState> = {
  login:loginReducer
}

export type AppState = {
  login:InitialStateLoginReducer
}