import {applyMiddleware, combineReducers, createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {thunk} from "redux-thunk";
import userReducer from "./user/reducer";
import contentReducer from "./content/reducer";
import langReducer from "./lang/reducer";

const rootReducer = combineReducers({
    content: contentReducer,
    user: userReducer,
    lang: langReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);