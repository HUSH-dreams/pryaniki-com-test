import React, {useEffect, useState} from 'react';
import {Button, Stack, Typography} from "@mui/joy";
import TableItemEdit from "./TableItemEdit";
import {useDispatch} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {tableDelete} from "../store/table/actions";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const TableItem = ({item, token}) => {
    const [isEdit, setEdit] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

    }, [item])

    const handleEdit = () => {
        setEdit(true);
    }

    const handleDelete = () => {
        setDelete(!isDelete);
    }

    const handleCancel = () => {
        setEdit(false);
    }

    const handleDeleteConfirm = () => {
        dispatch(tableDelete(token, item.id))
    }

    return (<>
        {!isEdit ? (<Stack direction="row" className="table-row table" sx={{p: '8px auto'}}>
            <Typography>{item.companySigDate?.substring(0,10)}</Typography>
            <Typography>{item.companySignatureName}</Typography>
            <Typography>{item.documentName}</Typography>
            <Typography>{item.documentStatus}</Typography>
            <Typography>{item.documentType}</Typography>
            <Typography>{item.employeeNumber}</Typography>
            <Typography>{item.employeeSigDate?.substring(0,10)}</Typography>
            <Typography>{item.employeeSignatureName}</Typography>
            <Stack direction="row" sx={{gap: 1}} className="table-row-buttons">
                <Button onClick={handleEdit} sx={{width: 24, height: 24}}>
                    <EditIcon/>
                </Button>
                <div style={{position: 'relative'}}>
                    <Button onClick={handleDelete} sx={{width: 24, height: 24, position: 'relative'}}>
                        <DeleteIcon/>
                    </Button>
                    {isDelete && (<>
                        <Stack direction="column" sx={{
                            gap: 1,
                            backgroundColor: 'rgb(80, 80, 120)',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 10,
                            p: 2,
                            borderRadius: 8,
                            width: 200
                        }}
                               className="table-row-buttons">
                            <Typography sx={{color: 'black'}}>You're going to <b>delete</b> this row. Confirm?</Typography>
                            <Stack direction="row" sx={{gap: 2, m: '0 auto'}}>
                                <Button sx={{width: 24, height: 24}} onClick={handleDeleteConfirm}>
                                    <CheckIcon/>
                                </Button>
                                <Button sx={{width: 24, height: 24}} onClick={handleDelete}>
                                    <CloseIcon/>
                                </Button>
                            </Stack>
                        </Stack>
                    </>)}
                </div>
            </Stack>
        </Stack>) : (<TableItemEdit item={item} token={token} edit={isEdit} action={() => handleCancel()}/>)}
    </>);
};

export default TableItem;