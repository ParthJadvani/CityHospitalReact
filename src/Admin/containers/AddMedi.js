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
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';

export default function AddMedi() {
  const [open, setOpen] = React.useState(false);
  const [locData, setlocData] = React.useState([]);
  // const [Update, setUpdate] = React.useState(false);



  const handleadd = (data) => {

    let localdata = JSON.parse(localStorage.getItem('medicine'));

    let rno = Math.floor(Math.random() * 1000);

    var NewData = { id: rno, ...data };

    if (localdata === null) {
      localStorage.setItem('medicine', JSON.stringify([NewData]));
      setlocData([NewData]);
    } else {
      localdata.push(NewData);
      localStorage.setItem('medicine', JSON.stringify(localdata));
      setlocData(localdata);
    }

    handleClose();
  }

  const handleEdit = (data) => {
    // console.log(data);
    setValues(data);
    setOpen(true);
    // setUpdate(true);
    // setFieldValue(data);
  }

  // const handleupdate = (data) => {
  //   setFieldValue(data)
  // }

  const handleDelete = (id) => {
    let localData = JSON.parse(localStorage.getItem("medicine"));

    let fdata = localData.filter((v, i) => v.id !== id);

    localStorage.setItem('medicine', JSON.stringify(fdata));
    setlocData(fdata);
  }

  React.useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("medicine"));

    if (localData !== null) {
      setlocData(localData);
    }
  }, []);

  const columns = [
    { field: 'name', headerName: 'Medicine', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'date', headerName: 'Expiry Date', width: 130 },
    { field: 'desc', headerName: 'Description', sortable: false, width: 400, },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

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
      // handleadd(values);
      // if (Update) {
      //   handleupdate(values);
      // } else {
        handleadd(values);
      // }

      action.resetForm();
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setFieldValue } = formik;
  // console.log(errors);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
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
      </div>
      <div style={{ height: 470, width: '100%' }}>
        <DataGrid
          rows={locData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[7, 14]}
          checkboxSelection
        />
      </div>
    </>
  );
}