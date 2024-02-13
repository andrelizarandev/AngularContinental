// Modules
import { ActionReducerMap } from '@ngrx/store';

// Reducers
import { InitialStateUiReducer, uiReducer } from './ui.reducer';
import { InitialStateLoginReducer, loginReducer } from './login.reducer';

export const reducers:ActionReducerMap<AppState> = {
  login:loginReducer,
  ui:uiReducer
}

export type AppState = {
  login:InitialStateLoginReducer,
  ui:InitialStateUiReducer
}