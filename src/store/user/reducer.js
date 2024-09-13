import {
    LOGIN_ERROR,
    LOGIN_START,
    LOGIN_SUCCESS,
    CLEAR_ERROR, LOGOUT_SUCCESS, LOGOUT_START
} from './actions';

const initialState = {
    token: null,
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                error: '',
                token: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload
            }
        case LOGOUT_START:
            return {
                ...state,
                error: ''
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: null
            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: ''
            }
        default:
            return state
    }
}

export default userReducer;