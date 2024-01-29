// Modules
import { createAction, props } from '@ngrx/store';

// Types
import { GetUser } from '../../api/login/login.types';

export const setUserDataAction = createAction(
  '[Login] Set User', props<{ user:GetUser }>()
);
