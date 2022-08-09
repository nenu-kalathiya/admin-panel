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
import { addmedicine, deleteMedicine, getMedicine, updateMedicine } from '../../redux/action/Medicine.Action';
import { useSelector, useDispatch } from "react-redux";

function Medicine(props) {

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
        // let localData = JSON.parse(localStorage.getItem('medicine'));

        // let uData = localData.map((d) => {
        //     if (d.id === values.id) {
        //         return values;
        //     } else {
        //         return d;
        //     }
        // })

        // localStorage.setItem("medicine", JSON.stringify(uData))

        dispatch(updateMedicine(values))

        loadData();
        formikobj.resetForm();
        handleClose();

        console.log(values);
    }

    let schema = yup.object().shape({
        name: yup.string().required("Enter Medicine Name"),
        price: yup.number().required('Enter Medicine Price').positive().integer(),
        quantity: yup.string().required("Enter Medicine Quantity"),
        expiry: yup.string().required("Enter Medicine Expiry")
    });

    const insertData = (values) => {
        let localData = JSON.parse(localStorage.getItem('medicine'));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }
        console.log(data);


        // if (localData === null) {
        //     localStorage.setItem("medicine", JSON.stringify([data]));
        // } else {
        //     localData.push(data);
        //     localStorage.setItem("medicine", JSON.stringify(localData));
        // }

        dispatch(addmedicine(data))
        loadData();
        formikobj.resetForm();
        handleClose();
    }

    const formikobj = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: ''
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

        // let localData = JSON.parse(localStorage.getItem('medicine'));
        // let fData = localData.filter((d) => d.id !== params.id)
        // localStorage.setItem("medicine", JSON.stringify(fData))
        dispatch(deleteMedicine(did))
        loadData();
        handleClose();
    }

    const columns = [
        { field: 'name', headerName: 'Medicine Name', width: 170 },
        { field: 'price', headerName: 'Medicine Price', width: 170 },
        { field: 'quantity', headerName: 'Medicine Quantity', width: 170 },
        { field: 'expiry', headerName: 'Medicine Expiry', width: 170 },
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
        dispatch(getMedicine())
    }, []);

    const dispatch = useDispatch();

    const medicine = useSelector(state => state.medicine)

    const loadData = () => {

        let localData = JSON.parse(localStorage.getItem('medicine'))

        if (localData !== null) {
            setData(localData)
        }


    }

    const handleSearch = (val) => {
        let localData = JSON.parse(localStorage.getItem("medicine"));

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
                medicine.isLoading ?
                    <p>Loading....</p>
                    :
                    medicine.error !== '' ?
                        <p>{medicine.error}</p>
                        :
                        <div>
                            <h2>Medicine</h2>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Add Medicine
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
                                    rows={medicine.medicine}
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
                                        <DialogTitle>Add Medicine</DialogTitle>
                                }
                                <Formik values={formikobj}>
                                    <Form onSubmit={handleSubmit}>
                                        <DialogContent>
                                            <TextField
                                                value={values.name}
                                                margin="dense"
                                                name="name"
                                                label="Medicine Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name ? <p className='text-danger' >{errors.name}</p> : ''}
                                            <TextField
                                                value={values.price}
                                                margin="dense"
                                                name="price"
                                                label="Medicine Price"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                                            <TextField
                                                value={values.quantity}
                                                margin="dense"
                                                name="quantity"
                                                label="Medicine quantity"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
                                            <TextField
                                                value={values.expiry}
                                                margin="dense"
                                                name="expiry"
                                                label="Medicine expiry"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}
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

export default Medicine;