import * as actions from './actions';
import { useSelector, useDispatch } from "../../../store";
import sdk from "./sdk";

// Lets create our custom Hook that linked interface with state interractions
function useAuth() {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const methods = {

        login: (credentials, cb) => sdk.login(credentials).then(res => {
            if (res.success) {
                console.log('res', res);
                dispatch({ type: actions.LOGIN_SUCCESS, payload: res });
                // Fire the cb
                if (cb) cb(null, res);
            } else {
                // Fire the cb
                if (cb) cb(res, null);
            }
        }),

        register: (user, cb) => sdk.register(user).then(res => {
            if (res.success) {
                dispatch({ type: actions.REGISTER_SUCCESS, payload: res });
                // Fire the cb
                if (cb) cb(null, res);
            } else {
                // Fire the cb
                if (cb) cb(res, null);
            }
        }),

        confirmAccount: (token, cb) => sdk.confirmAccount(token).then(data => {
            if (data.success) {
                if (cb) cb(null, data);
            } else {
                if (cb) cb(data, null);
            }
        }),

        confirm: (cb) => sdk.confirm().then(res => {
            if (res.success) {
                dispatch({ type: actions.CONFIRM_SUCCESS, payload: res });
                // Fire the cb
                if (cb) cb(null, res);
            } else {
                // Fire the cb
                if (cb) cb(res, null);
            }
        }),

        logout: () => dispatch({ type: actions.LOGOUT }),
        
    };

    return [ auth, methods ];
    
}

export default useAuth;