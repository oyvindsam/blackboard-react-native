import {Course} from "../types";

export interface CoursesState {
    courses: Course[];
    fetching: boolean;
}