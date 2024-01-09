import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function DepartmentForm({ onhandleSubmit, onUpdate }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (onUpdate) {
            setValues(onUpdate);
            handleClickOpen();
        }

    }, [onUpdate]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let departmentSchema = Yup.object({
        name: Yup.string().required(),
        desc: Yup.string().required(),
        prec: Yup.mixed().required("Please Upload File")
    });

    const formik = useFormik({
        validationSchema: departmentSchema,
        initialValues: {
            name: '',
            desc: '',
            prec: ''
        },
        onSubmit: (values, action) => {
            //   alert(JSON.stringify(values, null, 2));
            onhandleSubmit(values);
            action.resetForm();
            handleClose();
        },
    });

    const { values, touched, handleBlur, handleChange, handleSubmit, errors, setValues, setFieldValue } = formik;

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Department</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Department Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            margin="dense"
                            id="desc"
                            label="Discription"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.desc}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            margin="dense"
                            id="prec"
                            name="prec"
                            label="Upload File"
                            type="file"
                            fullWidth
                            variant="standard"
                            // value={values.desc}
                            onChange={(event) => setFieldValue("prec", event.target.files[0])}
                        />
                        {/* <img src={typeof values.prec === "string" ? values.prec : URL.createObjectURL(values.prec)} style={{ height: "50px", width: "50px" }} /> */}
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit'>Submit</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}