// Modules
import { createSelector } from '@ngrx/store';

// Types
import { AppState } from '../reducers';

export const uiSelector = (state:AppState) => state.ui;

export const messageSelector = createSelector(uiSelector, (ui) => ui.message);

export const showSidebarSelector = createSelector(uiSelector, (ui) => ui.showSidebar);