import ActionTypes from '../constant/constant';
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
export function getHistory(value)
{
    return dispatch=>dispatch({type:ActionTypes.getHistory,payload:value})

}
