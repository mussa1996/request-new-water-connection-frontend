import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS,LOGOUT } from '../../actions/LoginAction'

const initialState = {
    success: false,
    error: false,
    pending: false,
    message: '',
    isLoggedIn:false
}


const LoginReducer = (state= initialState,action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                pending:true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                success: true,
                pending: false,
                isLoggedIn:true
            }
        case LOGIN_ERROR:
            return {
                ...state,
                success: false,
                pending: false,
                error: true,
                message:action.payload
            }
        case LOGOUT:
            return {
                ...state,
                success: false,
                pending: false,
                error: true,
                isLoggedIn:false
            }
        default:
            return state
   }
};

export default LoginReducer;