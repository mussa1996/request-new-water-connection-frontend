import { combineReducers } from 'redux'
import signupReducer from './userReducer/Signup.reducer'
import LoginReducer from './userReducer/LoginReducer'


 const rootReducer =combineReducers({
    signup: signupReducer,
    login: LoginReducer,
 })

 export default rootReducer