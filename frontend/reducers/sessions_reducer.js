import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions';

const _nullUser = Object.freeze({
    id: null
});

const SessionReducer = (state = _nullUser, action) => {
  
   Object.freeze(state);
   // const currentState = Object.assign({}, state);

   switch(action.type) {
       case RECEIVE_CURRENT_USER: 
         return {id: action.currentUser.id};
       case LOGOUT_CURRENT_USER: return _nullUser;
       default: return state;
   }
};

export default SessionReducer;
