import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddDocForm({ onhandleSubmit, onUpdate }) {
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

    let doctorSchema = Yup.object({
        name: Yup.string().required('Enter doctor name'),
        designation: Yup.string().required('Please enter designation'),
        discription: Yup.string().required('Please enter discription'),
    });

    const formik = useFormik({
        validationSchema: doctorSchema,
        initialValues: {
            name: '',
            designation: '',
            discription: '',
        },
        onSubmit:(values, action) => {
            // alert(JSON.stringify(values, null, 2));
            onhandleSubmit(values);
            action.resetForm();
            handleClose();
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } = formik;
    console.log(errors);


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Doctor's
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Doctor's</DialogTitle>
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
                            label="Doctor Name"
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
                            id="designation"
                            name='designation'
                            label="Designation"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.designation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.designation && touched.designation ? errors.designation : ''}
                            error={errors.designation && touched.designation ? errors.designation : ''}
                        />
                        <TextField
                            margin="dense"
                            id="discription"
                            name='discription'
                            label="Discription"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.discription}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={errors.discription && touched.discription ? errors.discription : ''}
                            error={errors.discription && touched.discription ? errors.discription : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default AddDocForm;