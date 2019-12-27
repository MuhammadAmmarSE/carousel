import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    memberType: "",
    uid:null,
    getHis:null,
    userName:null,
    userProPhoto:null,
    phoneNumber:null,
    ThemesLeft:null,
    UserSince:null,
    LastLogin:null,
    setUser:null,
    userDataname:null,
    userDataLastLogin:null,
    userDataMemberType:null,
    userDataUserSince:null,
    userDatacredits:null,
    userDataemail:null,

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
                case ActionTypes.getHistory:
                return({
                    ...state,
                    getHis:action.payload,
                })
                case ActionTypes.setUser:
                return({
                    ...state,
                    setUser:action.payload,
                })
                case ActionTypes.userData:
                    return({
                        ...state,
                        userDataname:action.payload.name,
                        userDataLastLogin:action.payload.LastLogin,
                        userDataMemberType:action.payload.MemberType,
                        userDataUserSince:action.payload.UserSince,
                        userDatacredits:action.payload.credits,
                        userDataemail:action.payload.email,
                    })
                
        default:
            return state;
    }


}