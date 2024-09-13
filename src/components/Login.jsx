import React, {useState} from 'react';
import {Box, Button, FormControl, Input, Stack, Typography} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {selectError} from "../store/user/selectors";
import Message from "./Message";
import {clearError, loginError, loginInitiate} from "../store/user/actions";

const Login = () => {
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            dispatch(clearError());

            setTimeout(() => {
                dispatch(loginError('Fill in required fields'));
            },100);
        } else {
            dispatch(loginInitiate(username, password))
        }
    }

    return (
        <>
            <Box
                component="form"
                sx={{ m: '0 auto', p: 3, maxWidth: 500, gap: 2 }}
                autoComplete="off"
                noValidate
                onSubmit={e => handleSubmit(e)}
            >
                <Stack sx={{gap: 2, textAlign: 'center'}}>
                    <Typography variant="h2" component="h2">Authorization</Typography>
                    <FormControl
                        variant="standard"
                        sx={{ gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Username*" value={username} onChange={e => setUsername(e.target.value)}/>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Password*" value={password} onChange={e => setPassword(e.target.value)} />
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">
                        Sign In
                    </Button>
                    {
                        error && (<Message isError={true} message={error} action={clearError}/>)
                    }
                </Stack>
            </Box>
        </>
    );
};

export default Login;