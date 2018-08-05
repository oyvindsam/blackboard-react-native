import {CoursesActions} from "./coursesActions";
import {CoursesState} from "./types";

const initialState: CoursesState = {
    courses: [],
    fetching: false
};

// Reducer
const coursesReducer = (state: CoursesState = initialState, action: CoursesActions) => {
    switch (action.type) {
        case 'FETCH_COURSES':
            return {
                ...state,
                fetching: true
            };
        case 'FETCH_SUCCESSFUL':
            return {
                ...state,
                courses: action.courses,
                fetching: false
            };
        case 'FETCH_FAILED':
            return {
                ...state,
                courses: [],
                fetching: false
            };
        default:
            return state;
    }
};

export default coursesReducer;

