import {fork} from "redux-saga/effects";
import loginSaga from './../login/loginSaga';
import coursesSaga from './../courses/coursesSaga';

function* saga() {
    yield fork(loginSaga);
    yield fork(coursesSaga);
}

export default saga;