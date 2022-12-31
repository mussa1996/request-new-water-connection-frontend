import { REQUEST_SIGNUP, REQUEST_SUCCESS, REQUEST_ERROR } from '../../actions/Signup.action';

const initialState = {
    requesting: false,
    success: false,
    successMessage: '',
    errorOpen: false,
    error: '',
}
const SignupReducer = (state=initialState, action) => {
    switch (action.type) {
        case REQUEST_SIGNUP:
            return {
              ...state,
              requesting: true,
            }
          case REQUEST_SUCCESS:
            return {
              ...state,
              success: true,
              requesting: false,
              successMessage: action.payload
            }
          case REQUEST_ERROR:
            return {
              ...state,
              requesting: false,
              errorOpen: true,
              error: action.payload,
              successMessage: action.payload.message
            }
            default:
                return state
    }
};

export default SignupReducer;