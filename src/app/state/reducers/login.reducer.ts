// Modules
import { createReducer, on } from '@ngrx/store';

// Actions
import { setUserDataAction } from '../actions/login.actions';

// Types
import { GetUser } from '../../api/login/login.types'

export const initialStateLoginReducer:InitialStateLoginReducer = {
  user:null
}

export type InitialStateLoginReducer = {
  user:GetUser | null;
}

export const loginReducer = createReducer<InitialStateLoginReducer>(initialStateLoginReducer, 
  
  on(setUserDataAction, (state, { user }) => {
    return { ...state, user }
  })
  
)