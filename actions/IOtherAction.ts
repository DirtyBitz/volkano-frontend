/*
 * All reducers get all actions, so if the actions does not fit the reducer it 
 * will fall trough it (default case in switch). To allow testing that the initial state gets
 * set correctly you can pass this dummy action to the reducer and it will not change it's state.
 */
export interface IOtherAction {
  readonly type: '__other__'
}

export const OtherAction: IOtherAction = {
  type: '__other__',
}
