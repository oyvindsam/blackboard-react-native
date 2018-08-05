import {BlackboardSession, BaseCourse, Course, User, UserCourse, LoginInfo} from "../types";
import {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import axios from 'axios';

export const apiPath = (params: string[]) => params.join("/");

export const getUserLoginSession = (username: string, password: string) => {
    return axios.post('https://ntnu.blackboard.com/webapps/login/', 'user_id=' + username + '&password=' + password)
        .then(validateResponseStatus)
        .then(extractSessionCookie)
        .then(cookie => getBlackboardSession(cookie, username))
};

const validateResponseStatus = (response: AxiosResponse) => {
    if (response.status !== 200) throw Error("Request failed with status code " + response.status);
    return response;
};

// TODO: add some more logic and error handling. Use some global cookie solution?
const extractSessionCookie = (blackboardResponse: AxiosResponse) => {
    return blackboardResponse.headers["set-cookie"][0].split(";")[0];
};

export const getBlackboardSession = (cookie: string, username: string) => {
    let apiInstance = axios.create({
        baseURL: 'https://ntnu.blackboard.com/learn/api/public/v1/',  // some REST endpoints use v2!
        headers: { Cookie: cookie },
    });

    return apiInstance.request({
        url: "users?userName=" + username
    })
        .then(validateResponseStatus)
        .then(res => {
        let found = res.data.results[0];
        if (found) {
            return  {
                apiInstance: apiInstance,
                user: {
                    id: found.id,
                    userName: found.userName,
                    name: found.name.given + " " + found.name.family
                }
            };
        } else throw Error("No user found with userName: " + username)
    })
};
