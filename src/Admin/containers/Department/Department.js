import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DepartmentForm from './DepartmentForm';
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment, editDepartment, getDepartment, removeDepartment } from '../../../Redux/Action/department.action';

export default function Department() {
    const [Update, setUpdate] = React.useState(null);

    const dispatch = useDispatch();
    const department = useSelector((state) => state.department);


    React.useEffect(() => {
        dispatch(getDepartment());
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
            <button onClick={() => handleUpdate(params.row)}>Edit</button>
            <button onClick={() => handleDelete(params.row.id)}>Delete</button>
            </>
          )
        }
      ];
  return (
    <>
    <DepartmentForm onhandleSubmit={handleSubmit} onUpdate={Update}/>
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
  );
}