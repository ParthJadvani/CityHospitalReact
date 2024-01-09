import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup'
import CustomButton from '../components/UI/CustomButton';
import Heading from '../components/UI/Heading/Heading';
import { ThemeContext } from '../../Context/ThemeContext';

function Contact1(props) {
    let theme = useContext(ThemeContext);

    let contactSchema = Yup.object({
        name: Yup.string().required('Please enter your name').matches(/^[A-Za-z ]*$/, 'please enter Only character'),
        email: Yup.string().required('Please enter your email').email('Please enter valid email'),
        subject: Yup.string().required('Please enter your subject'),
        message: Yup.string().required('Please enter your message').test('message','Max 5 Words allow', 
        function(val) {
            let arr = val.split(" ");

            if (arr.length > 5) {
                return false
            } else {
                return true
            }
        }),
    });

        const formik = useFormik({
            validationSchema : contactSchema,
            initialValues: {
                name: '',
                email: '',
                subject: '',
                message: '',
            },
            onSubmit: values => {
                // alert(JSON.stringify(values, null, 2));
            },
        });

        const {values, errors, touched, handleBlur, handleChange, handleSubmit} = formik;


        return (
            <section id="contact" className={`${theme.theme} contact`}>
                <div className="container">
                    <div className="section-title">
                        <h2>Contact</h2>
                        <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                            blandit quam volutpat sollicitudin. Aenean ac turpis ante. Mauris velit sapien, aliquet aliquet rhoncus quis,
                            luctus at neque. Mauris sit amet massa sed orci vehicula facilisis.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-lg-4">
                            <div className="info">
                                <div className="address">
                                    <i className="bi bi-geo-alt" />
                                    <h4>Location:</h4>
                                    <p> F-505, Inovative Plazza New Delhi, India</p>
                                </div>
                                <div className="email">
                                    <i className="bi bi-envelope" />
                                    <h4>Email:</h4>
                                    <p>cityhospital@example.com</p>
                                </div>
                                <div className="phone">
                                    <i className="bi bi-phone" />
                                    <h4>Call:</h4>
                                    <p>+91 9988776655</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 mt-5 mt-lg-0">
                            <form action method="post" role="form" className="php-email-form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <input type="text" 
                                        name="name" 
                                        className="form-control" 
                                        id="name" 
                                        value={values.name} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        placeholder="Your Name" 
                                    />
                                        <span className='err'>{errors.name && touched.name ? errors.name : ''}</span>
                                    </div>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <input type="email" 
                                        className="form-control" 
                                        name="email" 
                                        id="email" 
                                        value={values.email} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur} 
                                        placeholder="Your Email" 
                                    />
                                        <span className='err'>{errors.email && touched.email ? errors.email : ''}</span>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" 
                                    className="form-control" 
                                    name="subject" 
                                    id="subject" 
                                    value={values.subject} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    placeholder="Subject" 
                                />
                                    <span className='err'>{errors.subject && touched.subject ? errors.subject : ''}</span>
                                </div>
                                <div className="form-group mt-3">
                                    <textarea className="form-control" 
                                    name="message" 
                                    value={values.message} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur} 
                                    rows={5} 
                                    placeholder="Message" 
                                />
                                    <span className='err'>{errors.message && touched.message ? errors.message : ''}</span>
                                </div>
                                <div className="my-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message" />
                                    <div className="sent-message">Your message has been sent. Thank you!</div>
                                </div>
                                <div className="text-center"><CustomButton val={'Send Message'}/></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    export default Contact1;