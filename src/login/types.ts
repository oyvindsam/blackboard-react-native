import {BlackboardSession} from "../types";

export interface LoginState {
    username: string,
    password: string,
    loggedIn: boolean;
    fetchingData: boolean;
    bbSession: BlackboardSession;
}
