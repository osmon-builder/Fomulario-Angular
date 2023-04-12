import { createReducer, on } from '@ngrx/store';

import { login, logout } from "../actions/auth.actions";

export interface UserState{
  logged : any
}

export const initialState : UserState ={
  logged: false
};

 const _appReducer = createReducer(
  initialState,
  on(login, (state,{logged}) => ({ ...state, logged: logged })),
  on(logout, (state,{logged}) => ({ ...state, logged: logged })),
);

export function appReducer(state:any, action:any) {
  return _appReducer(state, action);
}