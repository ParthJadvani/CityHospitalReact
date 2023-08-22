import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { addDoctordata, delDoctordata, getDoctordata, updateDoctordata } from '../../../Redux/Action/doctore.action';
import AddDocForm from './AddDocForm';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

export default function AddDoctor() {
  const [Update, setUpdate] = React.useState(null);

  const dispDoctor = useDispatch();
  const dData = useSelector(state => state.data);
  console.log(dData);

  React.useEffect(() => {
    dispDoctor(getDoctordata());
  }, []);

  const handleSubmit = (data) => {
    // console.log(data);
    if (Update) {
      dispDoctor(updateDoctordata(data));
    } else {
      dispDoctor(addDoctordata(data));
    }
  }

  const handleEdit = (data) => {
    setUpdate(data);
  }

  const handleDelete = (id) => {
    console.log(id);
    dispDoctor(delDoctordata(id));
  }

  const columns = [
    { field: 'name', headerName: 'Doctor', width: 130 },
    { field: 'designation', headerName: 'Designation', width: 130 },
    { field: 'discription', headerName: 'Discription', width: 130 },
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