// Actions
import {BlackboardSession} from "../types";
import {AxiosError} from "axios";

export interface NewInput {
    type: 'NEW_INPUT';
    username: string;
    password: string;
}

export interface StartLogin {
    type: 'START_LOGIN';
    username: string;
    password: string;
}

interface LoginSuccessful {
    type: 'LOGIN_SUCCESSFUL';
    bbSession: BlackboardSession;
}

interface LoginFailed {
    type: 'LOGIN_FAILED';
    error: AxiosError;
}

export type LoginActions =
    | NewInput
    | StartLogin
    | LoginSuccessful
    | LoginFailed;

export const input = (username: string, password: string): NewInput => ({
        type: 'NEW_INPUT',
        username,
        password
});

export const login = (username: string, password: string): StartLogin => ({
    type: 'START_LOGIN',
    username,
    password
});

export const loginSuccessful = (bbSession: BlackboardSession): LoginSuccessful => ({
        type: 'LOGIN_SUCCESSFUL',
        bbSession
});

export const loginFailed = (error: AxiosError) => ({
        type: 'LOGIN_FAILED',
        error
});

