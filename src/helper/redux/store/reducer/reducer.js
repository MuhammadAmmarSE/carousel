import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    memberType: "",
    uid:null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionTypes.MT:
            return ({
                ...state,
                memberType: action.payload
               
            })
        case ActionTypes.UID:
            return ({
                ...state,
                uid: action.payload
                   
            })
            case ActionTypes.UserInfo:
                return({
                    ...state,
                    userName:action.payload.userName,
                    userProPhoto:action.payload.userProPhoto,
                    phoneNumber:action.payload.phoneNumber,
                    ThemesLeft:action.payload.phoneNumber,
                    UserSince:action.payload.UserSince,
                    LastLogin:action.payload.LastLogin,
                })    
        default:
            return state;
    }


}