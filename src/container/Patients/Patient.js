import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form, useFormik } from 'formik';
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { addPatient, deletePatient, getPatient, updatePatient } from '../../redux/action/Patients.Action';
import { useSelector, useDispatch } from "react-redux";

function Patient(props) {

    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [update, setUpdate] = useState(false)
    const [did, setDid] = useState(0);
    const [data, setData] = useState([]);
    const [filterdata, setFilterData] = useState([])

    const handleClickDOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
        setUpdate(false);
        formikobj.resetForm();
    };

    const handleEdit = (params) => {
        setUpdate(true)
        handleClickOpen()
        formikobj.setValues(params.row)
    }

    const handleUpdateData = (values) => {
        // let localData = JSON.parse(localStorage.getItem('patients'));

        // let uData = localData.map((d) => {
        //     if (d.id === values.id) {
        //         return values;
        //     } else {
        //         return d;
        //     }
        // })

        // localStorage.setItem("patients", JSON.stringify(uData))

        dispatch(updatePatient(values))

        loadData();
        formikobj.resetForm();
        handleClose();

        console.log(values);
    }

    let schema = yup.object().shape({
        name: yup.string().required("Enter Patients Name"),
        gender: yup.mixed().oneOf(['male', 'female', 'other']).required("Enter Patients Gender"),
        age: yup.number().required('Enter Patients Age').positive().integer(),
        phone: yup.string().required("enter your number"),
        date: yup.string().required("Enter Patients appointment Date ")
    });

    const insertData = (values) => {
        let localData = JSON.parse(localStorage.getItem('patient'));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }
        console.log(data);

        // if (localData === null) {
        //     localStorage.setItem("patients", JSON.stringify([data]));
        // } else {
        //     localData.push(data);
        //     localStorage.setItem("patients", JSON.stringify(localData));
        // }

        dispatch(addPatient(data))
        loadData();
        formikobj.resetForm();
        handleClose();
    }

    const formikobj = useFormik({
        initialValues: {
            name: '',
            gender: '',
            phone: '',
            age: '',
            date: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleUpdateData(values)
            } else {
                insertData(values);
            }
        },
    });

    const handleDelete = () => {

        // let localData = JSON.parse(localStorage.getItem('patients'));
        // let fData = localData.filter((d) => d.id !== did)
        // localStorage.setItem("patients", JSON.stringify(fData))
        dispatch(deletePatient(did))
        loadData();
        handleClose();
    }

    const columns = [
        { field: 'name', headerName: 'Patients Name', width: 170 },
        { field: 'gender', headerName: 'Patients Gender', width: 170 },
        { field: 'phone', headerName: 'Patients phone Number', width: 170 },
        { field: 'age', headerName: 'Patients Age', width: 170 },
        { field: 'date', headerName: 'Patients Appointment Date', width: 170 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params)}>
                        <ModeEditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleClickDOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>

            )
        },
    ];

    useEffect(() => {

        // loadData();
        dispatch(getPatient())
    }, []);

    const dispatch = useDispatch();

    const Patient = useSelector(state => state.patient)

    const loadData = () => {

        let localData = JSON.parse(localStorage.getItem('patient'))

        if (localData !== null) {
            setData(localData)
        }

    }

    const handleSearch = (val) => {
        let localData = JSON.parse(localStorage.getItem("patient"));

        let fData = localData.filter((d) => (
            d.name.toLowerCase().includes(val.toLowerCase()) ||
            d.price.toString().includes(val) ||
            d.quantity.toString().includes(val) ||
            d.expiry.toString().includes(val)

        ))
        setFilterData(fData)
    }

    let finalData = filterdata.length > 0 ? filterdata : data

    const { handleChange, errors, handleSubmit, handleBlur, touched, values } = formikobj
    return (
        <div>
            {
                Patient.isLoading ?
                    <p>Loading....</p>
                    :
                    Patient.error !== '' ?
                        <p>{Patient.error}</p>
                        :
                        <div>
                <h2>Patients</h2>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Patients Form
                </Button>
                <TextField
                    margin="dense"
                    name="name"
                    label="Medicine Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={Patient.patient}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>
                <Dialog
                    open={dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure to delete?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog fullWidth open={open} onClose={handleClose}>
                    {
                        update ?
                            <DialogTitle>Update Your Data</DialogTitle>
                            :
                            <DialogTitle>Add Patients</DialogTitle>
                    }

                    <Formik values={formikobj}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.name}
                                    margin="dense"
                                    name="name"
                                    label="patients Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p className='text-danger' >{errors.name}</p> : ''}
                                <TextField
                                    value={values.gender}
                                    margin="dense"
                                    name="gender"
                                    label="Patients gender"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.gender && touched.gender ? <p>{errors.gender}</p> : ''}
                                <TextField
                                    value={values.phone}
                                    margin="dense"
                                    name="phone"
                                    label="patients Phone Num"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.phone && touched.phone ? <p>{errors.phone}</p> : ''}
                                <TextField
                                    value={values.age}
                                    margin="dense"
                                    name="age"
                                    label="Patients Age"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.age && touched.age ? <p>{errors.age}</p> : ''}
                                <TextField
                                    value={values.date}
                                    margin="dense"
                                    name="date"
                                    label="Patients appinment date"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.date && touched.date ? <p>{errors.date}</p> : ''}
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    {
                                        update ?
                                            <Button type='submit'>Update</Button>
                                            :
                                            <Button type='submit'>Submit</Button>
                                    }
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>

            </div>
            }
        </div>
    );
}

export default Patient;