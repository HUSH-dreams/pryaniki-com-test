import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";

const Message = ({message, action, isError}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(action());
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <span className={isError ? 'message-error' : 'message-success'}>
            {message}
        </span>
    );
};

export default Message;