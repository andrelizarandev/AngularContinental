// Modules
import { createAction, props } from '@ngrx/store';

// Types
import { MessageData } from '../reducers/ui.reducer';
import { ConfirmDialogPayload } from '../../dialogs/shared/confirm-dialog/confirm-dialog.component';

export const setMessageFromUiDataAction = createAction(
  '[Ui] Set Message', props<{ message:MessageData }>()
);

export const setShowSidebarAction = createAction(
  '[Ui] Set Show Sidebar', props<{ showSidebar:boolean }>()
);

export const setConfirmDialogPayloadAction = createAction(
  '[Ui] Set Confirm Dialog Payload', props<{ confirmDialogPayload:ConfirmDialogPayload | null }>()
);