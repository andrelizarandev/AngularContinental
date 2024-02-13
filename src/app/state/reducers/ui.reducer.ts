// Modules
import { createReducer, on } from '@ngrx/store';

// Actions
import { setMessageFromUiDataAction } from '../actions/ui-actions';

export const initialStateUiReducer:InitialStateUiReducer = {
  message: null
}

export type InitialStateUiReducer = {
  message:MessageData | null;
}

export const uiReducer = createReducer<InitialStateUiReducer>(initialStateUiReducer, 
  
  on(setMessageFromUiDataAction, (state, { message }) => {
    return { ...state, message }
  })
  
)

export type MessageData = {
  message:string;
  type:'success' | 'error' | 'warning' | 'info';
}