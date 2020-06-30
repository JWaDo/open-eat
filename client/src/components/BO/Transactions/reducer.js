import * as actions from './actions';

const initialState = {
    transactions: [],
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: action.payload,
            };
            break;
            
        default:
            return state;
            break;
    }
}
