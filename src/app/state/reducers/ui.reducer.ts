// Modules
import { createReducer, on } from '@ngrx/store';

// Actions
import { setMessageFromUiDataAction, setShowSidebarAction } from '../actions/ui-actions';

export const initialStateUiReducer:InitialStateUiReducer = {
  message: null,
  showSidebar: true
}

export type InitialStateUiReducer = {
  message:MessageData | null;
  showSidebar:boolean;
}

export const uiReducer = createReducer<InitialStateUiReducer>(initialStateUiReducer, 
  
  on(setMessageFromUiDataAction, (state, { message }) => {
    return { ...state, message }
  }),

  on(setShowSidebarAction, (state, { showSidebar }) => {
    return { ...state, showSidebar }
  }
  
));

export type MessageData = {
  message:string;
  body:string;
  type:'success' | 'error' | 'warning' | 'info';
}