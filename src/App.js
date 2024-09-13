import './App.css';
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {Route, Routes} from "react-router-dom";
import {persistor, store} from "./store/configureStore";
import Layout from "./components/Layout";
import ErrorPage from "./components/ErrorPage";
import './styles.css';
import Login from "./components/Login";
import Table from "./components/Table";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<Layout/>}/>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/table' element={<Table />}/>
                        <Route path='*' element={<ErrorPage/>}/>
                    </Route>
                </Routes>
            </PersistGate>
        </Provider>
    );
}

export default App;
