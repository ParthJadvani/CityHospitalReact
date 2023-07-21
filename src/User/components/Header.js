import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './UI/CustomButton';

function Header(props) {
    let localdata = localStorage.getItem('loginstatus');

    const handlelogout = () => {
        localStorage.removeItem('loginstatus');
    }
    return (
        <div className="main-header">
            <div id="topbar" className="d-flex align-items-center fixed-top">
                <div className="container d-flex justify-content-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope" /> <a href="mailto:contact@example.com">cityhospital@example.com</a>
                        <i className="bi bi-phone" /> +91 9988776655
                    </div>
                    <div className="d-none d-lg-flex social-links align-items-center">
                        <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                </div>
            </div>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center">
                    <div className="logo">
                        <Link to="/">
                            <h1 className="logo me-auto">City</h1><br />
                            <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
                        </Link>
                    </div>
                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li><Link className="nav-link scrollto active" to={'/'}>Home</Link></li>
                            <li><Link className="nav-link scrollto" to={'/Departments'}>Departments</Link></li>
                            <li><Link className="nav-link scrollto" to={'/Doctors'}>Doctors</Link></li>
                            <li><Link className="nav-link scrollto " to={'/About'}>About</Link></li>
                            <li><Link className="nav-link scrollto" to={'/Contact1'}>Contact</Link></li>
                            {/* <li><Link className="nav-link scrollto" to={'/Fullform'}>Form</Link></li> */}
                            <li><Link className="nav-link scrollto" to={'/Medicine'}>Medicine</Link></li>
                            {/* <li><Link className="nav-link scrollto" to={'/Counter'}>Counter</Link></li> */}
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>
                    <Link to="/Appointment"><CustomButton val={'Make Appointment'}/></Link>

                    {
                        localdata ? <Link to="/Auth1" onClick={handlelogout}>
                            <CustomButton val={'Logout'}/>
                        </Link>
                            : <Link to="/Auth1" >
                                {/* <span className="d-none d-md-inline">Login/ Signup</span> */}
                                <CustomButton val={'Login/Signup'}/>
                            </Link>
                            // : <CustomButton val={'login'}/>
                    }
                    
                </div>
            </header>
        </div>

    );
}

export default Header;