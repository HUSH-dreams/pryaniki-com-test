import React, {useState} from 'react';
import {Box, Button, FormControl, Input, Stack} from "@mui/joy";
import Message from "./Message";
import {clearError} from "../store/user/actions";

const TableItemAdd = () => {
    const [companySigDate, setCompanySigDate] = useState('');
    const [companySignatureName, setCompanySignatureName] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [documentStatus, setDocumentStatus] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [employeeSigDate, setEmployeeSigDate] = useState('');
    const [employeeSignatureName, setEmployeeSignatureName] = useState('');

    return (
        <>
            <Box
                component="form"
                sx={{m: '0 auto', p: 3, gap: 2}}
                autoComplete="off"
                noValidate
                onSubmit={e => handleSubmit(e)}
            >
                <Stack sx={{gap: 1, flexWrap: 'wrap'}} direction="row" className="table-form">
                    <FormControl
                        variant="standard"
                        sx={{gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Company signature date" value={companySigDate}
                               onChange={e => setCompanySigDate(e.target.value)}/>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Company signature name" value={companySignatureName}
                               onChange={e => setCompanySignatureName(e.target.value)}/>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Document name" value={documentName}
                               onChange={e => setDocumentName(e.target.value)}/>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Document status" value={documentStatus}
                               onChange={e => setDocumentStatus(e.target.value)}/>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Document type" value={documentType}
                               onChange={e => setDocumentType(e.target.value)}/>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Employee number" value={employeeNumber}
                               onChange={e => setEmployeeNumber(e.target.value)}/>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Employee signature date" value={employeeSigDate}
                               onChange={e => setEmployeeSigDate(e.target.value)}/>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{gap: 1}}
                    >
                        <Input variant="outlined" placeholder="Employee signature name" value={employeeSignatureName}
                               onChange={e => setEmployeeSignatureName(e.target.value)}/>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                    {error && (<Message isError={true} message={error} action={clearError}/>)}
                </Stack>
            </Box>
        </>
    );
};

export default TableItemAdd;