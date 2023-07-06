import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import AddMediForm from './AddMediForm';

export default function AddMedi() {
  const [locData, setlocData] = React.useState([]);
  const [Update, setUpdate] = React.useState(null);

  React.useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("medicine"));

    if (localData !== null) {
        setlocData(localData);
    }
}, []);

  const handleSubmitdata = (data) => {

    let localdata = JSON.parse(localStorage.getItem('medicine'));

    let rno = Math.floor(Math.random() * 1000);

    var NewData = { id: rno, ...data };

    if (localdata === null) {
      localStorage.setItem('medicine', JSON.stringify([NewData]));
      setlocData([NewData]);
    } else {
      if (Update) {
        let udata = localdata.map((v) => {
          if (v.id == data.id) {
            return data;
          } else {
            return v;
          }
        })
        localStorage.setItem('medicine', JSON.stringify(udata));
        setlocData(udata);
      } else {
        localdata.push(NewData);
        localStorage.setItem('medicine', JSON.stringify(localdata));
        setlocData(localdata);
      }

    }
    setUpdate(null);
  }

  const handleEdit = (data) => {
    setUpdate(data);
  }

  const handleDelete = (id) => {
    let localData = JSON.parse(localStorage.getItem("medicine"));

    let fdata = localData.filter((v, i) => v.id !== id);

    localStorage.setItem('medicine', JSON.stringify(fdata));
    setlocData(fdata);
  }

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


  return (
    <>
      <AddMediForm onhandleSubmitdata={handleSubmitdata} onUpdate={Update}/>

      <div style={{ height: 470, width: '100%' }}>
        <DataGrid
          rows={locData}
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