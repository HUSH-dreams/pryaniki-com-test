export const LOGIN_START = "USER::LOGIN_START";
export const LOGIN_SUCCESS = "USER::LOGIN_SUCCESS";
export const LOGOUT_START = "USER::LOGOUT_START";
export const LOGOUT_SUCCESS = "USER::LOGOUT_SUCCESS";
export const LOGIN_ERROR = "USER::LOGIN_ERROR";
export const CLEAR_ERROR = "USER::CLEAR_ERROR";

export const loginStart = () => ({
    type: LOGIN_START
})

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export const logoutStart = () => ({
    type: LOGOUT_START
})

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
})

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    payload: error
})

export const clearError = () => ({
    type: CLEAR_ERROR
})

export const loginInitiate = (username, password) => {
    return async dispatch => {
        dispatch(loginStart());
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ru/data/v3/testmethods/docs/login`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            });

            const data = await response.json();

            if (!data.data || Number(data.error_code) !== 0) {
                dispatch(loginError(data.error_text))
            } else {
                dispatch(loginSuccess(data.data.token));
            }
        } catch (e) {
            dispatch(loginError(e.toString()));
            console.log(e.toString());
        }
    }
}

export const logoutInitiate = (token) => {
    return async dispatch => {
        dispatch(logoutStart());
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ru/data/v3/testmethods/docs/logout`, {
                method: 'GET',
                headers: {
                    'x-auth': token,
                    'Content-Type':'application/json'
                }
            });

            const data = await response.json();

            if (!data.data || Number(data.error_code) !== 0) {
                dispatch(loginError(data.error_text))
            } else {
                dispatch(logoutSuccess());
            }
        } catch (e) {
            dispatch(loginError(e.toString()));
            console.log(e.toString());
        }
    }
}