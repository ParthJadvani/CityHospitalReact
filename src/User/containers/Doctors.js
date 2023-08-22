import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../components/UI/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctordata } from '../../Redux/Action/doctore.action';
import { CircularProgress } from '@mui/material';

// const data = [
//     {
//         id: 1,
//         name: 'Atha Smith',
//         designation: 'Chief Medical Officer',
//         description: 'Duis sagittis rutrum neque, quis tincidunt arcu pretium ac.',
//         url: '../assets/img/doctors/doctors-1.jpg'
//     },
//     {
//         id: 2,
//         name: 'John White',
//         designation: 'Anesthesiologist',
//         description: 'Aenean ac turpis ante. Mauris velit sapien.',
//         url: '../assets/img/doctors/doctors-2.jpg'
//     },
//     {
//         id: 3,
//         name: 'Umika Loha',
//         designation: 'Cardiology',
//         description: 'Curabitur luctus eleifend odio. Phasellus placerat mi.',
//         url: '../assets/img/doctors/doctors-3.jpg'
//     },
//     {
//         id: 4,
//         name: 'Daimy Smith',
//         designation: 'Neurosurgeon',
//         description: 'Morbi vulputate, tortor nec pellentesque molestie, eros nisi ornare purus.',
//         url: '../assets/img/doctors/doctors-4.jpg'
//     },
// ]

function Doctors(props) {

    const dispDoctor = useDispatch();
    const dData = useSelector(state => state.data);
    // console.log(dData.doctor);

    React.useEffect(() => {
        dispDoctor(getDoctordata());
    }, []);


    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <Heading type='h2'>Doctors</Heading>
                    <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                    {/* <Link to={'/Doctordescrip/Visiting'}>Visiting Doctor</Link> */}
                </div>
                <div className="row">
                    {
                        dData.doctor.map((v, i) => {
                            return (
                                <div className="col-lg-6">
                                    <Link to={`/Doctordescrip/${v.id}`}>
                                        <div className="member d-flex align-items-start">
                                            <div className="pic"><img src={v.url} className="img-doctor" alt /></div>
                                            <div className="member-info">
                                                <h4>{v.name}</h4>
                                                <span>{v.designation}</span>
                                                <p>{v.description}</p>
                                                <div className="social">
                                                    <a href><i className="ri-twitter-fill" /></a>
                                                    <a href><i className="ri-facebook-fill" /></a>
                                                    <a href><i className="ri-instagram-fill" /></a>
                                                    <a href> <i className="ri-linkedin-box-fill" /> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>

    );
}

export default Doctors;