import {LoginState} from "./types";
import {LoginActions} from "./loginActions";

const initialState: LoginState = {
    username: "oyvinsam",
    password: "",
    loggedIn: false,
    fetchingData: false,
    bbSession: {
        apiInstance: null,
        user: null
    }
};

// Reducer
const loginReducer = (state: LoginState = initialState, action: LoginActions) => {
    switch(action.type) {
        case 'NEW_INPUT':
            console.log(action);
            return {
                ...state,
                username: action.username,
                password: action.password
            };
        case 'START_LOGIN':
            console.log("NEW LOGIN... " + action.username);
            return {
                ...state,
                fetchingData: true,
                password: ""
            };
        case 'LOGIN_SUCCESSFUL':
            console.log("LOGIN_SUCCESSFUL");
            return {
                ...state,
                bbSession: action.bbSession,
                fetchingData: false,
                loggedIn: true
            };
        case 'LOGIN_FAILED':
            console.log("LOGIN FAILED..." + action.error);
            return {
                ...state,
                fetchingData: false,
                loggedIn: false
            };
        default:
            return state
    }
};

export default loginReducer;


