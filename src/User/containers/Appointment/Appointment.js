import React, { useEffect, useState } from 'react';
import Heading from '../../components/UI/Heading/Heading';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateApt, aptAdd, deleteApt, getApt } from '../../../Redux/Slice/appointmentSlice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Appointment(props) {
    const [value, setValue] = React.useState(0);
    const [update, setUpdate] = useState(false);

    const handleChangee = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch();

    const aptData = useSelector(state => state.apt);
    // console.log(aptData);

    useEffect(() => {
        dispatch(getApt());
    }, []);

    const handleEdit = (data) => {
        // console.log(data);
        setUpdate(true);
        setValue(0);
        setValues(data);
    }

    const handleDelete = (data) => {
        // console.log(id, prName);
        dispatch(deleteApt(data));
    }


    var d = new Date();
    let nd = new Date(d.setDate(d.getDate() - 1));

    let appointmentSchema = Yup.object({
        name: Yup.string().required('Enter your name'),
        email: Yup.string().email('Please enter valid email').required('Please enter email'),
        phone: Yup.string().required('Please enter your number').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Please enter only number'),
        date: Yup.date().min(nd, 'enter valid date').required('Please enter Appointment Date'),
        message: Yup.string().required('Please enter Message').test('desc', 'Max 100 Words allow',
            function (val) {
                let arr = val.split(" ");

                if (arr.length > 100) {
                    return false
                } else {
                    return true
                }
            }),
        department: Yup.string().required('Please select your country'),
        prec: Yup.mixed().required("Please Upload File")
    });

    const formik = useFormik({
        validationSchema: appointmentSchema,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            date: '',
            department: '',
            message: '',
            prec: ''
        },
        onSubmit: (values, action) => {
            // console.log(values);
            setValue(1);

            if (update) {
                dispatch(UpdateApt(values));
            } else {
                dispatch(aptAdd(values));
            }

            action.resetForm();
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues, setFieldValue } = formik;

    // console.log(errors);

    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    <Heading type='h2'>Make an Appointment</Heading>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                        Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                </div>
                <div className="section-title d-flex justify-content-center">
                    <Tabs value={value} onChange={handleChangee} aria-label="icon label tabs example">
                        <Tab icon={<BorderColorOutlinedIcon />} label="Book Appointment" />
                        <Tab icon={<InventoryOutlinedIcon />} label="List Appointment" />
                    </Tabs>
                </div>

                {
                    value === 0 &&
                    <form action method="post" role="form" className="php-email-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    id="name"
                                    placeholder="Your Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.name && touched.name ? errors.name : ''}
                                />
                                <div className="validate" />
                                <span className='err'>{errors.name && touched.name ? errors.name : ''}</span>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Your Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email && touched.email ? errors.email : ''}
                                />
                                <div className="validate" />
                                <span className='err'>{errors.email && touched.email ? errors.email : ''}</span>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    id="phone"
                                    placeholder="Your Phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.phone && touched.phone ? errors.phone : ''}
                                />
                                <div className="validate" />
                                <span className='err'>{errors.phone && touched.phone ? errors.phone : ''}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group mt-3">
                                <input
                                    type="date"
                                    name="date"
                                    className="form-control datepicker"
                                    id="date"
                                    placeholder="Appointment Date"
                                    value={values.date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.date && touched.date ? errors.date : ''}
                                />
                                <div className="validate" />
                                <span className='err'>{errors.date && touched.date ? errors.date : ''}</span>
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select
                                    name="department"
                                    id="department"
                                    className="form-select"
                                    value={values.department}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.department && touched.department ? errors.department : ''}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Dep1">Department 1</option>
                                    <option value="Dep2">Department 2</option>
                                    <option value="Dep3">Department 3</option>
                                </select>
                                <div className="validate" />
                                <span className='err'>{errors.department && touched.department ? errors.department : ''}</span>
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <input
                                    type="file"
                                    name="prec"
                                    className="form-control datepicker"
                                    id="prec"
                                    placeholder="Upload File"
                                    // value={values.prec}
                                    onChange={(event) => setFieldValue("prec", event.target.files[0])}
                                    // onBlur={handleBlur}
                                    error={errors.prec && touched.prec ? errors.prec : ''}
                                />
                                <img src={typeof values.prec === "string" ? values.prec : URL.createObjectURL(values.prec)} style={{ height: "50px", width: "50px" }}/>
                                <div className="validate" />
                                <span className='err'>{errors.prec && touched.prec ? errors.prec : ''}</span>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <textarea
                                className="form-control"
                                name="message"
                                rows={5}
                                placeholder="Message (Optional)"
                                defaultValue={""}
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.message && touched.message ? errors.message : ''}
                            />
                            <div className="validate" />
                            <span className='err'>{errors.message && touched.message ? errors.message : ''}</span>
                        </div>
                        <div className="mb-3">
                            <div className="loading">Loading</div>
                            <div className="error-message" />
                            <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                        </div>
                        <div className="text-center"><button type="submit">Make an Appointment</button></div>
                    </form>
                }
                {
                    value === 1 &&
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Person Name</StyledTableCell>
                                    <StyledTableCell >Email</StyledTableCell>
                                    <StyledTableCell>Phone Number</StyledTableCell>
                                    <StyledTableCell>Appointment Date</StyledTableCell>
                                    <StyledTableCell>Message</StyledTableCell>
                                    <StyledTableCell>Department</StyledTableCell>
                                    <StyledTableCell>Document</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {aptData.apt.map((v) => (
                                    <StyledTableRow key={v.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {v.name}
                                        </StyledTableCell>
                                        <StyledTableCell>{v.email}</StyledTableCell>
                                        <StyledTableCell>{v.phone}</StyledTableCell>
                                        <StyledTableCell>{v.date}</StyledTableCell>
                                        <StyledTableCell>{v.message}</StyledTableCell>
                                        <StyledTableCell>{v.department}</StyledTableCell>
                                        <StyledTableCell><img src={v.prec} style={{ height: "50px", width: "50px" }}></img></StyledTableCell>
                                        <StyledTableCell>
                                            <>
                                                <IconButton aria-label="delete" onClick={() => handleEdit(v)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => handleDelete(v)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
        </section>
    );
}

export default Appointment;