import * as actions from './actions';
import { useSelector, useDispatch } from '../../../store';
import sdk from './sdk';

function useTransactions() {

    const transactions = useSelector(state => state.transactions);
    const dispatch = useDispatch();

    const methods = {

        getTransactions: (cb) => sdk.getTransactions().then(data => {
            if (data.success) {
                dispatch({ type: actions.GET_TRANSACTIONS_SUCCESS, payload: data.transactions });
                
                if (cb) cb(null, data.transactions);
            } else {
                dispatch({ type: actions.GET_TRANSACTIONS_FAILED });
                
                if (cb) cb(data, null);
            }
        }).catch(err => cb(err, null)),

        //
        getTransaction: (idTransaction, cb) => sdk.getTransaction(idTransaction).then(data => {
            if (data.success) {
                if (cb) cb (null, data.transaction);
            } else {
                if (cb) cb (data, null);
            }
        })
        
    };
    
    return [ transactions, methods ];
}

export default useTransactions;