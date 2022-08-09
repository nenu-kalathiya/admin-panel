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
import { adddoctor, deleteDoctor, getDoctor, updateDoctor } from '../../redux/action/Doctor.Action';
import { useSelector, useDispatch } from "react-redux";

function Doctor(props) {

    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [update, setUpdate] = useState(false)
    const [did, setDid] = useState(0);
    const [data, setData] = useState([])
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
        // let localData = JSON.parse(localStorage.getItem('doctor'));

        // let uData = localData.map((d) => {
        //     if (d.id === values.id) {
        //         return values;
        //     } else {
        //         return d;
        //     }
        // })

        // localStorage.setItem("doctor", JSON.stringify(uData))

        dispatch(updateDoctor(values))

        loadData();
        formikobj.resetForm();
        handleClose();

        console.log(values);
    }

    let schema = yup.object().shape({
        name: yup.string().required("Enter Doctor Name"),
        salary: yup.number().required('Enter Doctor Salary').positive().integer(),
        designation: yup.string().required("Enter Doctor Designation"),
        gender: yup.mixed().oneOf(['male', 'female', 'other']).required("Enter Doctor Gender"),
    });

    const insertData = (values) => {
        let localData = JSON.parse(localStorage.getItem('doctor'));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }
        console.log(data);


        // if (localData === null) {
        //     localStorage.setItem("doctor", JSON.stringify([data]));
        // } else {
        //     localData.push(data);
        //     localStorage.setItem("doctor", JSON.stringify(localData));
        // }

        dispatch(adddoctor(data))
        loadData();
        formikobj.resetForm();
        handleClose();
    }

    const formikobj = useFormik({
        initialValues: {
            name: '',
            salary: '',
            designation: '',
            gender: ''
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

    const handleDelete = (params) => {

        // let localData = JSON.parse(localStorage.getItem('doctor'));
        // let fData = localData.filter((d) => d.id !== params.id)
        // localStorage.setItem("doctor", JSON.stringify(fData))
        dispatch(deleteDoctor(did))
        loadData();
        handleClose();
    }

    const columns = [
        { field: 'name', headerName: 'Doctor Name', width: 170 },
        { field: 'salary', headerName: 'Doctor salary', width: 170 },
        { field: 'designation', headerName: 'Doctor designation', width: 170 },
        { field: 'gender', headerName: 'Doctor gender', width: 170 },
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
        dispatch(getDoctor())
    }, []);

    const dispatch = useDispatch();

    const doctor = useSelector(state => state.doctor)

    const loadData = () => {

        let localData = JSON.parse(localStorage.getItem('doctor'))

        if (localData !== null) {
            setData(localData)
        }


    }

    const handleSearch = (val) => {
        let localData = JSON.parse(localStorage.getItem("doctor"));

        let fData = localData.filter((d) => (
            d.name.toLowerCase().includes(val.toLowerCase()) ||
            d.salary.toString().includes(val) ||
            d.designation.toString().includes(val) ||
            d.gender.toString().includes(val)

        ))
        setFilterData(fData)
    }

    let finalData = filterdata.length > 0 ? filterdata : data

    const { handleChange, errors, handleSubmit, handleBlur, touched, values } = formikobj

    return (
        <div>
            {
                doctor.isLoading ?
                    <p>Loading....</p>
                    :
                    doctor.error !== '' ?
                        <p>{doctor.error}</p>
                        :
                        <div>
                            <h2>Doctor</h2>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Add Doctor
                            </Button>
                            <TextField
                                margin="dense"
                                name="name"
                                label="Doctor Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={doctor.doctor}
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
                                        <DialogTitle>Add Doctor</DialogTitle>
                                }
                                <Formik values={formikobj}>
                                    <Form onSubmit={handleSubmit}>
                                        <DialogContent>
                                            <TextField
                                                value={values.name}
                                                margin="dense"
                                                name="name"
                                                label="Doctor Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name ? <p className='text-danger' >{errors.name}</p> : ''}
                                            <TextField
                                                value={values.salary}
                                                margin="dense"
                                                name="salary"
                                                label="Doctor salary"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.salary && touched.salary ? <p>{errors.salary}</p> : ''}
                                            <TextField
                                                value={values.designation}
                                                margin="dense"
                                                name="designation"
                                                label="Doctor designation"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.designation && touched.designation ? <p>{errors.designation}</p> : ''}
                                            <TextField
                                                value={values.gender}
                                                margin="dense"
                                                name="gender"
                                                label="Doctor gender"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.gender && touched.gender ? <p>{errors.gender}</p> : ''}
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

export default Doctor;