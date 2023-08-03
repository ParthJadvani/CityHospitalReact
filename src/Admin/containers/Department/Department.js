import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DepartmentForm from './DepartmentForm';
import { useDispatch, useSelector } from 'react-redux';
// import { addDepartment, editDepartment, getDepartment, removeDepartment } from '../../../Redux/Action/department.action';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { addDepartment, editDepartment, fetchDepartments, removeDepartment } from '../../../Redux/Slice/departmentSlice';
import CircularProgress from '@mui/material/CircularProgress';

export default function Department() {
  const [Update, setUpdate] = React.useState(null);

  const dispatch = useDispatch();
  const department = useSelector((state) => state.department);


  React.useEffect(() => {
    dispatch(fetchDepartments());
  }, []);

  const handleSubmit = (data) => {
    console.log(data);
    if (Update) {
      dispatch(editDepartment(data));
    } else {
      dispatch(addDepartment(data));
    }
  }

  const handleDelete = (id) => {
    // console.log(id);
    dispatch(removeDepartment(id));
  }

  const handleUpdate = (data) => {
    console.log(data);
    setUpdate(data);
  }

  const columns = [
    { field: 'name', headerName: 'Department Name', width: 200 },
    { field: 'desc', headerName: 'Discription', width: 400 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 90,
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" onClick={() => handleUpdate(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];
  return (
    <>
      {
        department.isLoading ? <CircularProgress color="secondary"/>
          : department.error ? <p>{department.error}</p> :
          <>
            <DepartmentForm onhandleSubmit={handleSubmit} onUpdate={Update} />
            <div style={{ height: '100%', width: '100%' }}>
              <DataGrid
                rows={department.department}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          </>
      }

    </>
  );
}