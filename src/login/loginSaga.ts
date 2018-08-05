import {call, put, takeLatest} from "redux-saga/effects";
import {getUserLoginSession} from "../api/api";
import {loginFailed, loginSuccessful, StartLogin} from "./loginActions";
import {BlackboardSession} from "../types";

function* loginSaga(action: StartLogin) {
    try {
        const bbSession: BlackboardSession = yield call(getUserLoginSession, action.username, action.password);
        yield put(loginSuccessful(bbSession));
    } catch (e) {
        yield put(loginFailed(e))
    }
}

function* saga() {
    yield takeLatest('START_LOGIN', loginSaga);
}

export default saga;