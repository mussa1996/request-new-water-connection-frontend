import axios from 'axios';


 export const reset = (credentials) => dispatch => {
    
    return axios.put('http://localhost:4500/api/user/resetPassword', credentials)
        .then(res => {
            localStorage.setItem('resetToken');
           
        }).catch(err => {
            if (err.response) {
                
            }
             })
}
