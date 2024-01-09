import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { addDoctordata, delDoctordata, getDoctordata, updateDoctordata } from '../../../Redux/Action/doctore.action';
import AddDocForm from './AddDocForm';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { addDoctor, editDoctor, getDoctor, removeDoctor } from '../../../Redux/Slice/doctorSlice';

export default function AddDoctor() {
  const [Update, setUpdate] = React.useState(null);

  const dispDoctor = useDispatch();
  const dData = useSelector(state => state.data);
  console.log(dData);

  React.useEffect(() => {
    dispDoctor(getDoctor());
  }, []);

  const handleSubmit = (data) => {
    // console.log(data);
    if (Update) {
      dispDoctor(editDoctor(data));
    } else {
      dispDoctor(addDoctor(data));
    }
  }

  const handleEdit = (data) => {
    setUpdate(data);
  }

  const handleDelete = (data) => {
    console.log(data);
    dispDoctor(removeDoctor(data));
  }

  const columns = [
    { field: 'name', headerName: 'Doctor', width: 130 },
    { field: 'designation', headerName: 'Designation', width: 130 },
    { field: 'discription', headerName: 'Discription', width: 400 },
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
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <AddDocForm onhandleSubmit={handleSubmit} onUpdate={Update} />
      <div style={{ height: 470, width: '100%' }}>
        <DataGrid
          rows={dData.doctor}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[50, 100]}
          checkboxSelection
        />
      </div>
    </>
  );
}