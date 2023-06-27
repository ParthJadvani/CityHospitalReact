import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

function FullForm(props) {

    let formSchema = Yup.object({
        // fname: Yup.string().required('Please enter your first name').matches(/^[A-Za-z ]*$/, 'Please enter only Char'),
        fname: Yup.string()
            .required('Please enter your Full name')
            .matches(/^[A-Za-z ]*$/, 'Please enter only Char')
            .test('fname', 'Enter valid name',
                function (fval) {
                    let arr = fval.split(" ");

                    if (arr.length === 3) {
                        return true
                    } else {
                        return false
                    }
                }),
        email: Yup.string().email('Please enter valid email').required('Please enter your email'),
        password: Yup.string().min(8).required('Please enter your password').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'please enter strong password'),
        cpassword: Yup.string()
        .required('Please Re-enter your password')
        .test('cpassword','Passwords must be match', 
        function (cval) {
            if (this.parent.password === cval) {
                return true;
            } else {
                return false;
            }
        }),
        phone: Yup.string().required('Please enter your number').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Please enter only number'),
        address: Yup.string().required('Please enter your message').test('address', 'Max 100 Words allow',
            function (val) {
                let arr = val.split(" ");

                if (arr.length > 100) {
                    return false
                } else {
                    return true
                }
            }),
        age: Yup.number().min(0).max(150).typeError('please select 0 to 150').required(),
        department: Yup.string().required('Please select your country'),
        date: Yup.date().max(new Date(), 'please enter valid DOB').required('please enter DOB'),
        gender: Yup.string().required('please select gender'),
        hobby : Yup.array().min(2,'please select 2').required(),
        tcs: Yup.bool().oneOf([true], 'You need to accept the terms & conditions')
    });


    const formik = useFormik({
        validationSchema: formSchema,
        initialValues: {
            fname: '',
            mname: '',
            lname: '',
            email: '',
            password: '',
            cpassword: '',
            phone: '',
            age: '',
            date: '',
            address: '',
            department: '',
            gender: '',
            hobby: '',
            tcs: false,
        },
        onSubmit: values => {
            console.log(values);
        },
    });

    // const phoneRegExp = 
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;
    console.log(errors);

    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    <h2>Details Form</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                        Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                </div>
                <form action method="post" role="form" className="php-email-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 form-group">
                            <input type="text"
                                name="fname"
                                className="form-control"
                                id="fname"
                                value={values.fname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="First Name"
                            />
                            <div className="validate" />
                            <span className='err'>{errors.fname && touched.fname ? errors.fname : ''}</span>
                        </div>
                        {/* <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input type="text"
                                name="mname"
                                className="form-control"
                                id="mname"
                                value={values.mname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Middle Name"
                            />
                            <div className="validate" />
                            <span className='err'>{errors.mname && touched.mname ? errors.mname : ''}</span>
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input type="text"
                                name="lname"
                                className="form-control"
                                id="lname"
                                value={values.lname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Last Name"
                            />
                            <div className="validate" />
                            <span className='err'>{errors.lname && touched.lname ? errors.lname : ''}</span>
                        </div> */}
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Your Email"
                            />
                            <div className="validate" />
                            <span className='err'>{errors.email && touched.email ? errors.email : ''}</span>
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Your Password"
                            />
                            <div className="validate" />
                            <span className='err'>{errors.password && touched.password ? errors.password : ''}</span>
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input type="password"
                                className="form-control"
                                name="cpassword"
                                id="cpassword"
                                value={values.cpassword}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                            />
                            <div className="validate" />
                            <span className='err'>{errors.cpassword && touched.cpassword ? errors.cpassword : ''}</span>
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input type="tel"
                                className="form-control"
                                name="phone"
                                id="phone"
                                value={values.phone}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Your Phone"
                            />
                            <div className="validate" />
                            <span className='err'>{errors.phone && touched.phone ? errors.phone : ''}</span>
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input type="text"
                                className="form-control"
                                name="age"
                                id="age"
                                value={values.age}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Your age"
                            />
                            <div className="validate" />
                            <span className='err'>{errors.age && touched.age ? errors.age : ''}</span>
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input type="date"
                                name="date"
                                className="form-control datepicker"
                                id="date"
                                value={values.date}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Birth Date"
                            />
                            <div className="validate" />
                            <span className='err'>{errors.date && touched.date ? errors.date : ''}</span>
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label for="html">Gender :</label>
                            <input type="radio" id="male" name="gender" value="male" onBlur={handleBlur} onChange={handleChange} />
                            <label for="male">Male</label>
                            <input type="radio" id="female" name="gender" value="female" onBlur={handleBlur} onChange={handleChange} />
                            <label for="female">Female</label>
                            <div className="validate" />
                            <span className='err'>{errors.gender && touched.gender ? errors.gender : ''}</span>
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <select name="department" id="department" className="form-select" value={values.department} onBlur={handleBlur} onChange={handleChange}>
                                <option value=''>Select Country</option>
                                <option value="india">India</option>
                                <option value="usa">USA</option>
                                <option value="uk">UK</option>
                            </select>
                            <div className="validate" />
                            <span className='err'>{errors.department && touched.department ? errors.department : ''}</span>
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <label for="html">Hobby :</label>
                            <input type="checkbox" id="cricket" name="hobby" value="cricket" onBlur={handleBlur} onChange={handleChange} />
                            <label for="htcricketml">Cricket</label>
                            <input type="checkbox" id="travel" name="hobby" value="travel" onBlur={handleBlur} onChange={handleChange} />
                            <label for="travel">Travel</label>
                            <input type="checkbox" id="chess" name="hobby" value="chess" onBlur={handleBlur} onChange={handleChange} />
                            <label for="chess">Chess</label>
                            <div className="validate" />
                            <span className='err'>{errors.hobby && touched.hobby ? errors.hobby : ''}</span>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <textarea className="form-control" name="address" rows={5} value={values.address} onBlur={handleBlur} onChange={handleChange} placeholder="Address (Optional)" defaultValue={""} />
                        <span className='err'>{errors.address && touched.address ? errors.address : ''}</span><br></br>
                        <div className="validate" />
                        <input type="checkbox" id="tcs" name="tcs" value="tcs" onBlur={handleBlur} onChange={handleChange} />
                        <label for="tcs">Tems & Condition</label>
                        <span className='err'>{errors.tcs && touched.tcs ? errors.tcs : ''}</span>
                    </div>
                    <div className="text-center"><button type="submit">Submit</button></div>
                </form>
            </div>
        </section>
    );
}

export default FullForm;