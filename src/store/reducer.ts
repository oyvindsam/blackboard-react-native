import { combineReducers } from 'redux';

import login from '../login/loginReducer';
import courses from '../courses/coursesReducer';
import {LoginState} from "../login/types";
import {CoursesState} from "../courses/types";

export interface AppState {
    login: LoginState,
    courses: CoursesState
}

export default combineReducers({
    login,
    courses
})