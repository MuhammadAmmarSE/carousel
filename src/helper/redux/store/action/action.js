import ActionTypes from '../';
import { func } from 'prop-types';


export function memberType(info){
  return dispatch => dispatch({type: ActionTypes.MT, payload: info})
}

export function userId(info){
  return dispatch => dispatch({type: ActionTypes.UID, payload: info})
}

export function UserInfo(value)
{
    return dispatch=>dispatch({type:ActionTypes.UserInfo,payload:value})

}