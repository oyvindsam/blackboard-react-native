import {createStore, applyMiddleware, Action} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, {AppState} from './reducer';
import saga from "./sagas";

// Hey look at this hack of a thing
const logger = (state: any) => (next: (action: any) => void) => (action: any) => {
    console.log("Action fired: " + action.type.toString());
    next(action)
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, logger];

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(saga);

export default store;