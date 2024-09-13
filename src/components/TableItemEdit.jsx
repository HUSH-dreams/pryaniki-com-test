import React, {useState} from 'react';
import {Box, Button, Input, Stack} from "@mui/joy";
import {useDispatch} from "react-redux";
import {tableAdd, tableError, tableUpdate} from "../store/table/actions";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const TableItemEdit = ({item, token, action}) => {
    const dispatch = useDispatch();

    const [companySigDate, setCompanySigDate] = useState(item ? item.companySigDate?.substring(0, 10) : '');
    const [companySignatureName, setCompanySignatureName] = useState(item ? item.companySignatureName : '');
    const [documentName, setDocumentName] = useState(item ? item.documentName : '');
    const [documentStatus, setDocumentStatus] = useState(item ? item.documentStatus : '');
    const [documentType, setDocumentType] = useState(item ? item.documentType : '');
    const [employeeNumber, setEmployeeNumber] = useState(item ? item.employeeNumber : '');
    const [employeeSigDate, setEmployeeSigDate] = useState(item ? item.employeeSigDate?.substring(0, 10) : '');
    const [employeeSignatureName, setEmployeeSignatureName] = useState(item ? item.employeeSignatureName : '');

    const handleSubmit = (e) => {
        e.preventDefault();

        const regex = /(19|20)\d{2}-(0[1-9]|1[1,2])-(0[1-9]|[12][0-9]|3[01])/;

        if (!companySigDate || !companySigDate.match(regex)) {
            dispatch(tableError('Required date format: yyyy-mm-dd'));
            return;
        }

        if (!employeeSigDate || !employeeSigDate.match(regex)) {
            dispatch(tableError('Required date format: yyyy-mm-dd'));
            return;
        }

        if (!item) {
            dispatch(tableAdd(token, {
                companySigDate: companySigDate + 'T00:00:00.000Z\t',
                companySignatureName: companySignatureName,
                documentName: documentName,
                documentStatus: documentStatus,
                documentType: documentType,
                employeeNumber: employeeNumber,
                employeeSigDate: employeeSigDate + 'T00:00:00.000Z\t',
                employeeSignatureName: employeeSignatureName
            }));
        } else {
            dispatch(tableUpdate(token, item.id, {
                companySigDate: companySigDate + 'T00:00:00.000Z\t',
                companySignatureName: companySignatureName,
                documentName: documentName,
                documentStatus: documentStatus,
                documentType: documentType,
                employeeNumber: employeeNumber,
                employeeSigDate: employeeSigDate + 'T00:00:00.000Z\t',
                employeeSignatureName: employeeSignatureName
            }))
        }

        if (action) {
            action();
        }

        if (!item) {
            setCompanySigDate('');
            setCompanySignatureName('');
            setDocumentName('');
            setDocumentType('');
            setDocumentStatus('');
            setEmployeeSignatureName('');
            setEmployeeSigDate('');
            setEmployeeNumber('');
        }
    }

    return (
        <>
            <Box
                component="form"
                autoComplete="off"
                noValidate
                onSubmit={e => handleSubmit(e)}
            >
                <Stack sx={{flexWrap: 'wrap'}} direction="row" className="table-row table">
                    <Input variant="outlined" placeholder="Company signature date" value={companySigDate}
                           onChange={e => setCompanySigDate(e.target.value)}/>
                    <Input variant="outlined" placeholder="Company signature name" value={companySignatureName}
                           onChange={e => setCompanySignatureName(e.target.value)}/>
                    <Input variant="outlined" placeholder="Document name" value={documentName}
                           onChange={e => setDocumentName(e.target.value)}/>
                    <Input variant="outlined" placeholder="Document status" value={documentStatus}
                           onChange={e => setDocumentStatus(e.target.value)}/>
                    <Input variant="outlined" placeholder="Document type" value={documentType}
                           onChange={e => setDocumentType(e.target.value)}/>
                    <Input variant="outlined" placeholder="Employee number" value={employeeNumber}
                           onChange={e => setEmployeeNumber(e.target.value)}/>
                    <Input variant="outlined" placeholder="Employee signature date" value={employeeSigDate}
                           onChange={e => setEmployeeSigDate(e.target.value)}/>
                    <Input variant="outlined" placeholder="Employee signature name" value={employeeSignatureName}
                           onChange={e => setEmployeeSignatureName(e.target.value)}/>
                    {
                        item ? (<Stack direction="row" sx={{gap: 1}} className="table-row-buttons">
                            <Button type="submit" sx={{width: 24, height: 24}}>
                                <CheckIcon/>
                            </Button>
                            <Button onClick={() => action()} sx={{width: 24, height: 24}}>
                                <CloseIcon/>
                            </Button>
                        </Stack>) : (<Stack direction="row" sx={{gap: 1}} className="table-row-buttons">
                            <Button type="submit" sx={{height: 24}}>
                                Save
                            </Button>
                        </Stack>)
                    }
                </Stack>
            </Box>
        </>
    );
};

export default TableItemEdit;