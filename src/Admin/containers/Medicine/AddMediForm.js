import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as Yup from 'yup';


function AddMediForm({ onhandleSubmitdata, onUpdate}) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (onUpdate) {
            setValues(onUpdate);
            handleClickOpen();
        }
        
    } ,[onUpdate]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    var d = new Date();
    let nd = new Date(d.setDate(d.getDate() - 1));

    let appointmentSchema = Yup.object({
        name: Yup.string().required('Enter your name'),
        price: Yup.number().required('Please enter price'),
        date: Yup.date().min(nd, 'enter valid date').required('Please enter date'),
        desc: Yup.string().required('Please enter Description').test('desc', 'Max 100 Words allow',
            function (val) {
                let arr = val.split(" ");

                if (arr.length > 100) {
                    return false
                } else {
                    return true
                }
            }),
    });

    const formik = useFormik({
        validationSchema: appointmentSchema,
        initialValues: {
            name: '',
            price: '',
            date: '',
            desc: '',
        },
        onSubmit: (values, action) => {
            onhandleSubmitdata(values);
            action.resetForm();
            handleClose();
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = formik;
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Medicine
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Medicine</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="name"
                            name='name'
                            label="Medicine Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.name && touched.name ? errors.name : ''}
                            error={errors.name && touched.name ? errors.name : ''}
                        />
                        <TextField
                            margin="dense"
                            id="price"
                            name='price'
                            label="Price "
                            type="number"
                            fullWidth
                            variant="standard"
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.cname && touched.cname ? errors.cname : ''}
                            error={errors.price && touched.price ? errors.price : ''}
                        />
                        <TextField
                            margin="dense"
                            id="date"
                            name='date'
                            label="Expiry Date"
                            type="date"
                            fullWidth
                            variant="standard"
                            value={values.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.date && touched.date ? errors.date : ''}
                            error={errors.date && touched.date ? errors.date : ''}
                        />
                        <TextField
                            fullWidth
                            id="desc"
                            name='desc'
                            label="Description"
                            multiline
                            rows={4}
                            variant="standard"
                            value={values.desc}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.desc && touched.desc ? errors.desc : ''}
                            error={errors.desc && touched.desc ? errors.desc : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default AddMediForm;