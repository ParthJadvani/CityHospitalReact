import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import Heading from '../components/UI/Heading/Heading';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { forgetRequest, loginRequest, signupRequest } from '../../Redux/Action/auth.action';
import { CircularProgress } from '@mui/material';

function Auth1(props) {
    const [authtype, setauthtype] = useState('login');
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const authData = useSelector((state) => state.auth);
    

    let authObj = {}; let authVal = {};

    if (authtype === 'login') {
        authObj = {
            email: Yup.string().email('Please enter valid email').required('Please enter your email'),
            password: Yup.string().required('Please enter your password').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'please enter strong password'),
        }
        authVal = {
            email: '',
            password: '',
        }
    } else if (authtype === 'signup') {
        authObj = {
            name: Yup.string().required('Please enter your name').matches(/^[A-Za-z ]*$/, 'Please enter only Char'),
            email: Yup.string().email('Please enter valid email').required('Please enter your email'),
            password: Yup.string().required('Please enter your password').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'please enter strong password'),
        }
        authVal = {
            name: '',
            email: '',
            password: '',
        }
    } else {
        authObj = {
            email: Yup.string().email('Please enter valid email').required('Please enter your email'),
        }
        authVal = {
            email: '',
        }
    }

    const handlelogin = (values) => {
        // console.log(values);
        dispatch(loginRequest({
            data: values,
            callback: (route) => {
                navigate(route);
            }
        }));
    }
    const handleSignup = (values) => {
        dispatch(signupRequest(values));
    }
    const handleforget = (values) => {
        dispatch(forgetRequest(values));
    }

    let authSchema = Yup.object(authObj);

    const formik = useFormik({
        validationSchema: authSchema,
        initialValues: authVal,
        enableReinitialize: true,
        onSubmit: (values, action) => {

            if (authtype === 'login') {
                handlelogin(values);
            } else if (authtype === 'signup') {
                handleSignup(values);
            } else if (authtype === 'forget') {
                handleforget(values);
            }
            action.resetForm();
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;


    // console.log(errors);
    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    {
                        authtype === 'login' ? <Heading type='h2'>Login</Heading>
                            : authtype === 'signup' ? <Heading type='h2'>Signup</Heading> : <Heading type='h2'>Reset Password</Heading>
                    }
                </div>
                {
                    authData.error ? <p>{authData.error}</p> : null
                }
                {
                    authData.loading ? <CircularProgress color="secondary" /> :
                        <>
                            <form action method="post" role="form" className="php-email-form" onSubmit={handleSubmit}>
                                <div className="row justify-content-center ">
                                    {
                                        authtype === 'login' || authtype === 'forget' ? null :

                                            <div className="col-md-7 form-group">
                                                <Input type="text"
                                                    name="name"
                                                    className="form-control"
                                                    id="name"
                                                    value={values.name}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Your Name"
                                                    errors={errors.name && touched.name ? errors.name : ''}
                                                />
                                                <div className="validate" />
                                            </div>
                                    }
                                    <div className="col-md-7 form-group mt-3 mt-md-0">
                                        <Input type="email"
                                            className="form-control"
                                            name="email" id="email"
                                            value={values.email}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Your Email"
                                            errors={errors.email && touched.email ? errors.email : ''}
                                        />
                                        <div className="validate" />
                                    </div>
                                    {
                                        authtype !== 'forget' ? <div className="col-md-7 form-group mt-3 mt-md-0">
                                            <Input type="password"
                                                className="form-control"
                                                name="password"
                                                id="password"
                                                value={values.password}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Your Password"
                                                errors={errors.password && touched.password ? errors.password : ''}
                                            />
                                            <div className="validate" />
                                        </div> : null
                                    }
                                    <div className="text-center m-2">
                                        {
                                            authtype === 'login' ? <a href='#' onClick={(() => setauthtype('forget'))}>Forgot password?</a>
                                                : null
                                        }
                                    </div>
                                </div>
                                {
                                    authtype === 'login' ? <div className="text-center"><Button type='primary'>Login</Button></div>
                                        : authtype === 'signup' ? <div className="text-center"><Button type='secondry'>Signup</Button></div>
                                            : <div className="text-center"><Button type='outline'>Send OTP</Button></div>
                                }
                                <div className="text-center m-2">
                                    {
                                        authtype === 'login' ? <span>Don't have an account <a href='#' onClick={() => setauthtype('signup')}>Signup</a></span>
                                            : <span>Already have an account <a href='#' onClick={() => setauthtype('login')}>Login</a></span>
                                    }
                                </div>

                            </form>
                        </>
                }


            </div>
        </section>
    );
}

export default Auth1;