import {Course} from "../types";
import {call, put, takeEvery} from "redux-saga/effects";
import {FetchCourses, fetchCoursesFailed, fetchCoursesSuccessful} from "./coursesActions";
import {superfunction} from "../api/gradebookApi";

function* fetchCourses(action: FetchCourses) {
    try {
        const courses: Course[] = yield call(superfunction, action.bbSession);
        //console.log(courses);

        yield put(fetchCoursesSuccessful(courses));
    } catch(e) {
        console.log(e);
        yield put(fetchCoursesFailed(e));
    }
}

function* saga() {
    yield takeEvery('FETCH_COURSES', fetchCourses);
}

export default saga;