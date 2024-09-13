import {
    TABLE_ERROR,
    TABLE_START,
    TABLE_SUCCESS,
    CLEAR_ERROR, TABLE_UPDATE_SUCCESS, TABLE_ADD_SUCCESS, TABLE_DELETE_SUCCESS, TABLE_ACTION_START
} from './actions';

const initialState = {
    table: [],
    loading: false,
    error: '',
    updated: ''
}

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case TABLE_START:
            return {
                ...state,
                error: '',
                table: [],
                loading: true
            }
        case TABLE_ACTION_START:
            return {
                ...state,
                error: '',
                loading: true
            }
        case TABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                table: action.payload.data
            }
        case TABLE_UPDATE_SUCCESS:
            const updateTable = [...state.table];
            const updateItemIndex = updateTable.findIndex(obj => obj.id === action.payload.data.id);
            updateTable[updateItemIndex] = action.payload.data

            return {
                ...state,
                loading: false,
                updated: new Date(),
                table: updateTable,
            }
        case TABLE_DELETE_SUCCESS:
            const deleteTable = [...state.table];
            const deleteItemIndex = deleteTable.findIndex(obj => obj.id === action.payload);
            deleteTable.splice(deleteItemIndex, 1);

            return {
                ...state,
                loading: false,
                updated: new Date(),
                table: [...deleteTable],

            }
        case TABLE_ADD_SUCCESS:
            const addTable = [...state.table];

            return {
                ...state,
                loading: false,
                updated: new Date(),
                table: [...addTable, action.payload.data]
            }
        case TABLE_ERROR:
            return {
                ...state,
                loading: false,
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

export default tableReducer;