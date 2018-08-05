import {Dispatch} from "redux";
import {getBbUserCourses} from "../api/coursesApi";
import {BlackboardSession, Course} from "../types";
import {AxiosError} from "axios";


// TODO: fix this type field. It needs to be a type and value, which is not a string
export interface FetchCourses {
    type: 'FETCH_COURSES';
    bbSession: BlackboardSession;
}

export interface FetchCoursesContents {
    type: 'FETCH_CONTENTS',
    bbSession: BlackboardSession,
    courses: Course[]
}

interface FetchSuccessful {
    type: 'FETCH_SUCCESSFUL';
    courses: Course[];
}

interface FetchFailed {
    type: 'FETCH_FAILED';
    error: AxiosError;
}

export type CoursesActions = FetchCourses & FetchSuccessful & FetchFailed;

export const fetchCourses = (bbSession: BlackboardSession): FetchCourses => ({
    type:'FETCH_COURSES',
    bbSession
});

export const fetchCoursesSuccessful = (courses: Course[]): FetchSuccessful => ({
        type: 'FETCH_SUCCESSFUL',
        courses
});

export const fetchCoursesFailed = (error: AxiosError): FetchFailed => ({
        type: 'FETCH_FAILED',
        error
});