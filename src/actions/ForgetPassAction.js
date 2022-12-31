
import axios from 'axios';



 export const forget = (credentials) => dispatch => {
  
    return axios.post('http://localhost:4500/api/user/forgetpassword', credentials)
        .then(res => {
            localStorage.setItem('resetToken', res.data.userData.resentLink);
            console.log(res.data.userData.resentLink)
            dispatch({
                
                payload:res.data
            })
        }).catch(err => {
            if (err.response) {
                
            }
             })
}
