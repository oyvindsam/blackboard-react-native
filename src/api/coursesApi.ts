import {apiPath} from "./api";
import {BaseCourse, BlackboardSession, Course} from "../types";

export const getBbUserCourses = (bbSession: BlackboardSession): Promise<Course[]> => {
    return bbSession.apiInstance.request({
        url: apiPath(['users', bbSession.user.id, 'courses'])
    })
        .then(res => res.data.results)
        .then((userCourses: BaseCourse[]) => {
            return Promise.all(userCourses.map(course => getBbCourse(bbSession, course)))
        })
        .then((courses: Course[]) => {
            return courses.map(course => {
                return {
                    id: course.id,
                    courseId: course.courseId,
                    name: course.name,
                    termId: course.termId
                }
            })
        })
};

export const getBbCourse = (bbSession: BlackboardSession, course: BaseCourse): Promise<Course> => {
    return bbSession.apiInstance.request({
        url: apiPath(['courses', course.courseId])
    })
        .then(res => res.data);
};
