import {AxiosInstance} from "axios";

export interface BlackboardSession {
    apiInstance: AxiosInstance | null;
    user: User | null;
}

export interface User {
    id: string;  // _24861_1
    userName: string;
    name: string  // name.given, name.family
}

export interface BaseCourse {
    courseId: string;  // 194_TDT4145_1_2018_V_1
}

// The course when you dump all courses
export interface Course extends BaseCourse {
    id: string;  // _5951_1
    name: string;  // TDT4145 Datamodellering og databasesystemer (2018 VÅR)
    termId: string; // specifies the semester. _29_1 = V18, _37_1 = V19..
}

export interface CourseWithGradebook extends Course {
    gradebook: FlatGradebookItem[];
}

/*
export interface Model {
    user: User;
    courses: [
        id: string;
        title: string;
        position: number;
        contents: [
            id: string;
            title: string;
            position: number;
            gradebook: [
                id: string;
                name: string;
                description: string;
                score: {
                    possible: number;
                    received: number;
                };
                due: string;
                ]
            ]
        ]

}

*/


// Left column in the course page
export interface CourseContent {
    id: string;
    title: string;
    position: number;
    hasChildren: boolean;
}

// One level down in the left column
export interface ContentItem {
    id: string;
    parentId: string;  // id to a CourseContent
    title: string;
    body: string;  // html element
    position: number;
    hasGradebookColumns: boolean;  // an assigment will have true here
}

export interface GradebookItem {
    id: string;
    contentId: string;
    name: string;
    description: string;
    score: {
        possible: number;
    };
    grading: {
        due: string;  // not always present
    }
}

export interface FlatGradebookItem {
    name: string;
    due: string;  // not always present
    maxScore: number;
    resultScore: number;
    description: string;
    id: string;
    contentId: string;
}

export interface GradebookGrade {
    columnId: string;  // id to a GradebookItem
    score: number;  // not always present (not in "Weighted Total")
}


