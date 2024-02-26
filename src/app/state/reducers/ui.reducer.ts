// Modules
import { createReducer, on } from '@ngrx/store';

// Actions
import { setConfirmDialogPayloadAction, setMessageFromUiDataAction, setShowSidebarAction } from '../actions/ui-actions';

// Types
import { ConfirmDialogPayload } from '../../dialogs/shared/confirm-dialog/confirm-dialog.component';

export const initialStateUiReducer:InitialStateUiReducer = {
  message: null,
  showSidebar: true,
  confirmDialogPayload: null
}

export type InitialStateUiReducer = {
  message:MessageData | null;
  showSidebar:boolean;
  confirmDialogPayload:ConfirmDialogPayload | null;
}

export const uiReducer = createReducer<InitialStateUiReducer>(initialStateUiReducer, 
  
  on(setMessageFromUiDataAction, (state, { message }) => {
    return { ...state, message }
  }),

  on(setShowSidebarAction, (state, { showSidebar }) => {
    return { ...state, showSidebar }
  }),

  on(setConfirmDialogPayloadAction, (state, { confirmDialogPayload }) => {
    return { ...state, confirmDialogPayload }
  }),

)

export type MessageData = {
  message:string;
  body:string;
  type:'success' | 'error' | 'warning' | 'info';
}