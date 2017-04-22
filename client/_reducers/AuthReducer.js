import { LOGIN_USER, REGISTER_USER } from '../_actions/AuthActions';

// Initial State
const initialState = { user: {} };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case REGISTER_USER:
      return action.payload;
    default:
      return state;
  }
};

// Export Reducer
export default authReducer;
