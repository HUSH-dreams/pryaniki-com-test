export const TABLE_START = "TABLE::TABLE_START";
export const TABLE_ACTION_START = "TABLE::TABLE_ACTION_START";
export const TABLE_SUCCESS = "TABLE::TABLE_SUCCESS";
export const TABLE_UPDATE_SUCCESS = "TABLE::TABLE_UPDATE_SUCCESS";
export const TABLE_DELETE_SUCCESS = "TABLE::TABLE_DELETE_SUCCESS";
export const TABLE_ADD_SUCCESS = "TABLE::TABLE_ADD_SUCCESS";
export const TABLE_ERROR = "TABLE::TABLE_ERROR";
export const CLEAR_ERROR = "TABLE::CLEAR_ERROR";

export const tableStart = () => ({
    type: TABLE_START
})

export const tableActionStart = () => ({
    type: TABLE_ACTION_START
})

export const tableSuccess = (data) => ({
    type: TABLE_SUCCESS,
    payload: data
})
export const tableUpdateSuccess = (data) => ({
    type: TABLE_UPDATE_SUCCESS,
    payload: data
})

export const tableDeleteSuccess = (id) => ({
    type: TABLE_DELETE_SUCCESS,
    payload: id
})

export const tableAddSuccess = (data) => ({
    type: TABLE_ADD_SUCCESS,
    payload: data
})
export const tableError = (error) => ({
    type: TABLE_ERROR,
    payload: error
})

export const clearError = () => ({
    type: CLEAR_ERROR
})

export const tableInitiate = (token) => {
    return async dispatch => {
        dispatch(tableStart());
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ru/data/v3/testmethods/docs/userdocs/get`, {
                headers: {
                    'x-auth': token
                }
            });

            const data = await response.json();

            if (data.error_code || !data.data) {
                dispatch(tableError(data.error_text))
            } else {
                dispatch(tableSuccess(data));
            }
        } catch (e) {
            dispatch(tableError(e.toString()));
            console.log(e.toString());
        }
    }
}

export const tableDelete = (token, id) => {
    return async dispatch => {
        dispatch(tableActionStart());

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
                method: 'POST',
                headers: {
                    'x-auth': token
                }
            });

            const data = await response.json();

            if (data.error_code !== 0) {
                dispatch(tableError(data.error_text))
            } else {
                dispatch(tableDeleteSuccess(id));
            }
        } catch (e) {
            dispatch(tableError(e.toString()));
            console.log(e.toString());
        }
    }
}

export const tableAdd = (token, item) => {
    return async dispatch => {
        dispatch(tableActionStart());

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ru/data/v3/testmethods/docs/userdocs/create`, {
                method: 'POST',
                headers: {
                    'x-auth': token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "companySigDate": item.companySigDate,
                    "companySignatureName": item.companySignatureName,
                    "documentName": item.documentName,
                    "documentStatus": item.documentStatus,
                    "documentType": item.documentType,
                    "employeeNumber": item.employeeNumber,
                    "employeeSigDate": item.employeeSigDate,
                    "employeeSignatureName": item.employeeSignatureName
                })
            });

            const data = await response.json();

            if (data.error_code) {
                dispatch(tableError(data.error_text))
            } else if (data.errors) {
                let newError = '';

                Object.keys(data.errors).forEach(function(key,index) {
                    newError += data.errors[key]+' ';
                });

                dispatch(tableError(newError));
            } else {
                dispatch(tableAddSuccess(data));
            }
        } catch (e) {
            dispatch(tableError(e.toString()));
            console.log(e.toString());
        }
    }
}

export const tableUpdate = (token, id, item) => {
    return async dispatch => {
        dispatch(tableActionStart());

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
                method: 'POST',
                headers: {
                    'x-auth': token,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    "companySigDate": item.companySigDate,
                    "companySignatureName": item.companySignatureName,
                    "documentName": item.documentName,
                    "documentStatus": item.documentStatus,
                    "documentType": item.documentType,
                    "employeeNumber": item.employeeNumber,
                    "employeeSigDate": item.employeeSigDate,
                    "employeeSignatureName": item.employeeSignatureName
                })
            });

            const data = await response.json();

            if (data.error_code || !data.data) {
                dispatch(tableError(data.error_text))
            } else {
                dispatch(tableUpdateSuccess(data));
            }
        } catch (e) {
            dispatch(tableError(e.toString()));
            console.log(e.toString());
        }
    }
}