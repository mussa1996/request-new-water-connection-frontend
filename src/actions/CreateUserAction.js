import axios from 'axios';

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const REQUEST_ERROR = 'REQUEST_ERROR'



const signup = (credentials)=>async dispatch=>{
    dispatch({
    type:REQUEST_SIGNUP
})
    return axios.post('http://localhost:4500/api/user/signup', credentials)
        .then(res => {
            console.log("signup data",res)
            localStorage.setItem('userTokenSign', res.data.token);
            dispatch({
                type: REQUEST_SUCCESS,
                payload:res.data
            })
    }).catch(err => {
        if (err.response) {
            dispatch({
                type: REQUEST_ERROR,
                payload:'provide valid credentials'
        })
       }
})
}
export default signup