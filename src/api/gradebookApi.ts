import {
    BaseCourse,
    BlackboardSession,
    Course,
    CourseContent,
    GradebookGrade,
    GradebookItem
} from "../types";
import {AxiosInstance} from "axios";
import {apiPath} from "./api";
import {call} from "redux-saga/effects";
import {throws} from "assert";
import {getBbUserCourses} from "./coursesApi";
import {SEMESTER} from "./constants";


/**
 * Emneinnhold-kolonnen (venstre kolonne på fagsiden). Hvert element er et 'content'
 * 'content.id' kan brukes til å finne childern til dette content-et
 */

export const getBbCourseContents = (bbSession: BlackboardSession, course: BaseCourse): Promise<CourseContent[]> => {
    return bbSession.apiInstance.request({
        url: apiPath(['courses', course.id, 'contents'])
    })
        .then(res => res.data.results)
};

/**
 * Gir alle underelementer til et content. F.eks hvis det er 'Øvinger' id som blir bruk vil
 * man få (delvis) info om alle øvingene tilbake.
 */
export const getBbCourseContent = (bbSession: BlackboardSession, courseId: string, contentId: string) => {
    return bbSession.apiInstance.request({
        url: apiPath(['courses', courseId, 'contents', contentId, 'children'])
    })
};

/* Gradebook: typisk en Øving/innlevering. Er de elementene du kan se på 'My grades'/'Mine resultater' på fagsiden
 * Interresant felter: {name, score: {possible}, due}
 * contentId er fremmednøkkel til gitt content element, som har mer beskrivelse av gradebook-elementet
 */
export const getBbCourseGradebook = (bbSession: BlackboardSession, courseId: string): Promise<GradebookItem[]> => {
    return bbSession.apiInstance.request({
        url: apiPath(['courses', courseId, 'gradebook', 'columns'])
    })
        .then(res => res.data.results)
};

/**
 * Gir alle 'Gradebook' resultatene i en liste. Eneste interessante her er feltet 'score'
 * columnId er fremmednøkkel til et 'courseGradebook' sitt 'id'.
 */
export const getBbCourseGradebookResults = (bbSession: BlackboardSession, courseId: string) => {
    if (bbSession.apiInstance) {
        return bbSession.apiInstance.request({
            url: apiPath(['courses', courseId, 'gradebook', 'users', bbSession.user.id])
        })
    }
};

/**
 * Some over men gir bare resultate til det gitte 'gradebook' elementet
 */
export const getBbCourseGradebookResult = (bbSession: BlackboardSession, courseId: string, columnId: string): Promise<GradebookGrade> => {
    return bbSession.apiInstance.request({
        url: apiPath(['courses', courseId, 'gradebook', 'columns', columnId, 'users', bbSession.user.id])
    })
        .then(res => res.data)
};

/**
 *  Med andre ord finnes denne koblingen:
 *  Courses -> Course -> CourseContents -> CourseContent
 *  CourseGradebook -> CourseContent
 *  GradebookResults -> GradebookResult
 */

// TODO: this fucking function
export const superfunction = async(bbSession: BlackboardSession) => {
    let userCourses = await getBbUserCourses(bbSession)
        .then((course: Course[]) => course.filter((course: Course) => course.termId === SEMESTER.SPRING18));  // TODO: better filtering
    return Promise.all(userCourses.map( async (course: Course) => {
        let gradebook = await getBbCourseGradebook(bbSession, course.id)
            .then((gradebook: GradebookItem[]) => gradebook.filter((item: GradebookItem) => item.contentId)) // TODO: better hanlding of non-valid gradeItems
            .then((gradebook: GradebookItem[]) => {
                console.log(gradebook);
                return Promise.all(gradebook.map(async (item: GradebookItem) => {
                    let resultScore = await getBbCourseGradebookResult(bbSession, course.id, item.id)
                        .then(result => result.score);  // might be undefined if no score
                    return {
                        name: item.name,
                        due: item.grading.due,
                        maxScore: item.score.possible,
                        contentId: item.contentId,
                        id: item.id,
                        resultScore
                    }
                }))
            });

        return {...course, gradebook}
    }))
};
