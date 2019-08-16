import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsync } from "react-async";
import ReactTable from "react-table";
import "react-table/react-table.css";
import LoadingIndicator from "../LoadingIndicator";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from "react-redux";
import './index.css';
import {createContact, loadContact} from 'store/actions/contacts'

function ContactTable() {
    const [contactData, setContactData] = useState([]);
    const [newContact, setNewContact] = useState({});
    const [newContactErr, setNewContactErr] = useState({});
    const [open, setOpen] = React.useState(false);

    const companyID = useSelector(({ context }) => (context.company ? context.company.id : 1));
    const customerID = useSelector(({ context }) => (context.customer ? context.customer.id : 2));

    const dispatch = useDispatch();
    
    const { data, error, isLoading } = useAsync({promiseFn: loadContact, companyID, customerID});
    
    function handleClickOpen() {
        setOpen(true);
    }
    
    function handleClose(e) {
        setOpen(false);
        setNewContact({});
        setNewContactErr({});
    };

    function validate() {
        let hasError = false;
        let requiredFields = ['first_name', 'last_name', 'email'];
        let validationData = {};

        requiredFields.forEach((field) => {
            let isValid = false;
            if (field === 'email') {
                const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
                isValid = reg.test(newContact[field]);
            } else {
                isValid = newContact[field] && newContact[field].length >= 2 ? true : false;
            }

            if (!isValid) {
                validationData = {...validationData, [field]: true};
                
                hasError = true;
            }
        });
        
        setNewContactErr(validationData);

        return !hasError;
    }

    function handleSave(e) {
        if (Object.keys(newContact).length === 0) {
            setNewContactErr(Object.assign(newContactErr,{first_name: true, last_name: true, email: true}));
            return;
        } else { 
            if (!validate()) {
                return;
            }
        }
        
        setOpen(false);
        dispatch(createContact(newContact, companyID, customerID));
        setNewContact({});
        setNewContactErr({});
    };

    function handleInputChange(e) {
        setNewContact(Object.assign(newContact,{[e.target.name]: e.target.value}));
    };

    useEffect(() => {
		setContactData(data);
    }, [data]);
    
	if (isLoading) return <LoadingIndicator />;
	if (error) return "Error:" + error;

	return (
		<div>
            <ReactTable
                className="-striped -highlight h-full w-full sm:rounded-16 overflow-hidden"
                data={contactData}
                
                columns={[
                    {
                        Header: "Nr",
                        accessor: "id",
                        width: 100,
                    },
                    {
                        Header: "First name",
                        accessor: "first_name",
                        className: "font-bold",
                    },
                    {
                        Header: "Last name",
                        accessor: "last_name",
                    },
                    {
                        Header: "Email",
                        accessor: "email",
                    },
                    {
                        Header: "Telephone",
                        accessor: "telephone",
                    },
                ]}
                defaultPageSize={5}
                noDataText="No Customers found"
            />
            <button 
                className="btnCreateContact"
                onClick={handleClickOpen}
            >Create contact</button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Creare contact</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="first_name"
                        error={newContactErr.first_name}
                        name="first_name"
                        label="First name"
                        type="text"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="last_name"
                        error={newContactErr.last_name}
                        name="last_name"
                        label="Last name"
                        type="text"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        error={newContactErr.email}
                        name="email"
                        label="Email"
                        type="email"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="telephone"
                        error={newContactErr.telephone}
                        name="telephone"
                        label="Telephone"
                        type="number"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
	);
}

export default ContactTable;
