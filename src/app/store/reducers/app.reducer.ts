import { ActionReducerMap } from '@ngrx/store';
import { UserState, appReducer } from './auth.reducer';


export interface AppState {
    auth: UserState,

}



export const appReducers: ActionReducerMap<AppState> = {
    auth: appReducer,

}