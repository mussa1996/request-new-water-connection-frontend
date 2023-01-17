import axios from 'axios';
import jwt_decode from "jwt-decode";
import cogoToast from 'cogo-toast';
export const LOGIN_REQUEST = 'LOGIN_REGUEST'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

 export const signin = (credentials) => dispatch => {
    dispatch({
        type:LOGIN_REQUEST
    })
    return axios.post('http://localhost:4500/api/user/login', credentials)
        .then(res => {
            localStorage.setItem('userToken', res.data.token);
            const user=res.data.token;
            const decoded = jwt_decode(user);
            console.log("token is:",user);
            console.log("role of user",decoded.role);
            cogoToast.success("Successfully Login");
            dispatch({
                
                type: LOGIN_SUCCESS,
                payload:res.data
            })
            if (decoded.role==='admin'){
                window.location.href = "/admin-dashboard";
            }
            if (decoded.role==='user'){
                window.location.href = "/user-dashboard";
            }
            if (decoded.role==='officer'){
                window.location.href = "/admin-dashboard";
            }
        }).catch(err => {
            if (err.response) {
                // cogoToast.error(" Wrong email or password");
                dispatch({
                    type: LOGIN_ERROR,
                    payload:'Wrong email or password'
                     })
            }
             })
}

export const logout =()=> dispatch => {
    dispatch({
        type: LOGOUT
    })
};