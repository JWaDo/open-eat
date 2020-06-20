// // Import reducers here
import counterReducer from './components/CounterExample/reducer';
import authReducer from './components/Auth/reducer';

function combineReducers(reducers) {
    return function (state = {}, action) {
      return Object.keys(reducers).reduce((stateGlobal, curr) => {
        let slice = reducers[curr](state[curr], action);
        return { ...stateGlobal, [curr]: slice };
      }, state);
    };
}

export default combineReducers({
    //
    auth: authReducer,
    counter: counterReducer,
});
