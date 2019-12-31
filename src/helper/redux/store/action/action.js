import ActionTypes from '../constant/constant';


export  function setUser(info){
  return dispatch => dispatch({type: ActionTypes.setUser, payload: info})
}
export  function userData(data){
  return dispatch => dispatch({type:ActionTypes.userData,payload:data}) 
}
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
