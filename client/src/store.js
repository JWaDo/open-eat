import React, { useContext, useEffect } from 'react';
import { useReducer } from 'reinspect'
import combinedReducer from './reducers';

const StoreContext = React.createContext();

export const SESSION_STATE_KEY = 'app.state';

export const StoreProvider = ({ children }) => {
    // Init all states with memorized values
    const memorizedState = JSON.parse(localStorage.getItem(SESSION_STATE_KEY));

    const initialState = memorizedState || combinedReducer(undefined, {type:'INIT/Context'});
    // 
    const contextValue = useReducer(combinedReducer, initialState, () => combinedReducer(undefined, {type: undefined}), 'store');

    useEffect(() => {
        localStorage.setItem(SESSION_STATE_KEY, JSON.stringify(contextValue[0]));
    }, [contextValue]);
    
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

/**
 * 
 * Create useSelector custom Hook
 */
export const useSelector = _function => {
    const [state, dispatch] = useContext(StoreContext);

    return _function(state);
};

/**
 * 
 * Create useDispatch custom Hook
 */
export const useDispatch = _function => {
    const [state, dispatch] = useContext(StoreContext);

    return dispatch;
};