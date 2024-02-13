// Modules
import { createAction, props } from '@ngrx/store';

// Types
import { MessageData } from '../reducers/ui.reducer';

export const setMessageFromUiDataAction = createAction(
  '[Ui] Set Message', props<{ message:MessageData }>()
);
