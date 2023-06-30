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

export default function AddAppointment() {
  const [open, setOpen] = React.useState(false);

  let appointmentSchema = Yup.object({
    name: Yup.string().required('Enter your name'),
    email: Yup.string().email('Please enter valid email').required('Please enter email'),
    mobile: Yup.number().max(10, 'enter max 10').required('please enter mobile number'),
    address: Yup.string().required('Please enter address'),
  });

  const formik = useFormik({
    validationSchema: appointmentSchema,
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      address: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Appointment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Appointment</DialogTitle>
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
              label="Patient Name"
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
              id="email"
              name='email'
              label="Enter Email"
              type="email"
              fullWidth
              variant="standard"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.email && touched.email ? errors.email : ''}
              error={errors.email && touched.email ? errors.email : ''}
            />
            <TextField
              margin="dense"
              id="mobile"
              name='mobile'
              label="Enter Mobile Number"
              type="text"
              fullWidth
              variant="standard"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.mobile && touched.mobile ? errors.mobile : ''}
              error={errors.mobile && touched.mobile ? errors.mobile : ''}
            />
            <TextField
              margin="dense"
              id="address"
              name='address'
              label="Enter Address"
              type="text"
              fullWidth
              variant="standard"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.address && touched.address ? errors.address : ''}
              error={errors.address && touched.address ? errors.address : ''}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div >
  );
}