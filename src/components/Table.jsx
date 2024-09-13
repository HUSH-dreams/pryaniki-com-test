import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearError, tableInitiate} from "../store/table/actions";
import {selectToken} from "../store/user/selectors";
import {selectError, selectLoading, selectTable} from "../store/table/selectors";
import {useNavigate} from "react-router-dom";
import {loginError, logoutInitiate} from "../store/user/actions";
import {Box, Button, LinearProgress, Stack, Typography} from "@mui/joy";
import Message from "./Message";
import TableItem from "./TableItem";
import TableItemEdit from "./TableItemEdit";

const Table = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const table = useSelector(selectTable);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const update = () => {
        if (token) {
            dispatch(tableInitiate(token));
        } else {
            dispatch(loginError('Authorization is needed'));
            navigate('/login');
        }
    }

    useEffect(() => {
        update();
    }, []);

    const handleLogout = () => {
        dispatch(logoutInitiate())
    }

    return (<Stack sx={{p: 1, width: '100%', alignItems: 'center'}}>
        <Stack direction="row" sx={{gap: 1, alignItems: 'center', mb: 2}}>
            <Typography variant="h1" component="h1" sx={{textAlign: 'center', fontSize: 24}}>Table</Typography>
            <Button onClick={handleLogout} sx={{height: 1}}>Log Out</Button>
        </Stack>
        <Stack direction="row" className="table-row" sx={{mb: 1.5, backgroundColor: 'rgba(120, 120, 180, 0.7)', alignItems: 'start'}}>
            <Typography component="span" sx={{textAlign: 'center'}}>Company signature date</Typography>
            <Typography component="span" sx={{textAlign: 'center'}}>Company signature name</Typography>
            <Typography component="span" sx={{textAlign: 'center'}}>Document name</Typography>
            <Typography component="span" sx={{textAlign: 'center'}}>Document status</Typography>
            <Typography component="span" sx={{textAlign: 'center'}}>Document type</Typography>
            <Typography component="span" sx={{textAlign: 'center'}}>Employee number</Typography>
            <Typography component="span" sx={{textAlign: 'center'}}>Employee signature date</Typography>
            <Typography component="span" sx={{textAlign: 'center'}}>Employee signature name</Typography>
            <Typography component="span" sx={{textAlign: 'center'}}>Action</Typography>
        </Stack>
        {table?.map(row => (<TableItem key={row.id} item={row} token={token}/>))}

        <div style={{backgroundColor: 'rgba(120, 120, 180, 0.7)'}}>
            <TableItemEdit token={token}/>
        </div>
        {loading && (<Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>)}

        {error && (<Message isError={true} message={error} action={clearError}/>)}
    </Stack>);
};

export default Table;