import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectToken} from "../store/user/selectors";

const Layout = () => {
    const token = useSelector(selectToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            navigate('/table');
        }
    },[token])

    return (
        <div className="wrapper">
            <Outlet />
        </div>
    );
};

export default Layout;