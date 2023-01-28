
import axios from 'axios';



export const verify = (credentials) => dispatch => {
   
 
   return axios.post('http://localhost:4500/api/user/verify?', credentials)
   console.log("data",credentials)
       .then(res => {


           dispatch({
               
               payload:res.data
           })
       }).catch(err => {
           if (err.response) {
               
           }
            })
}
