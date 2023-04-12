// auth.actions.ts

import { createAction, props } from '@ngrx/store';

export const login = createAction('[login Component] Login', props<{logged:boolean}>());
export const logout = createAction('[Home Component] Logout',props<{logged:boolean}>());
