import * as weatherActions from '../actions';

export interface State {
  email: string,
  password: string,
  isAuth: boolean
}

export const InitialState: State = {
  email: '',
  password: '',
  isAuth: false
}

export function authReducer(state = InitialState, action: weatherActions.Action) {
  switch (action.type) {
    case weatherActions.LOGGIN_IN_SUCCESS: 
    console.log(action.payload);
      return {
        ...state,
          // email: action.payload.email,
          // password: action.payload.password,
          isAuth: true
      }
    default:
      return state;
  }
}

export const getAuth = (state: State) => state;