import * as actions from './actions';

const initialState = {
    user: null,
    token: null,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.LOGIN_SUCCESS:{
            const { token } = action.payload;
            return {
                user: JSON.parse(atob(token.split('.')[1])),
                token,
            };
            break;
        }
        
        case action.LOGOUT: 
        case action.CONFIRM_FAILED: 
            return initialState
            break;

        /**
         * We only define this 2 actions causes others do not affect our state
         */

        default:
            return state;
    }
}
