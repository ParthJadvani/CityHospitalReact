import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './UI/CustomButton';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { ThemeContext } from '../../Context/ThemeContext';
import { logoutRequest } from '../../Redux/Action/auth.action';

function Header(props) {
    // let localdata = localStorage.getItem('loginstatus');
    // let cardData = JSON.parse(localStorage.getItem("CardId"));
    let cartData = useSelector((state) => state.cart);
    let auth = useSelector((state) => state.auth);
    let dispatch = useDispatch();

    let theme = useContext(ThemeContext);
    // console.log(theme);

    let CartCount = 0;
    if (cartData) {
        // CartCount = cartData.items.reduce((acc, v, i) => acc + v.qty, 0);
    }

    const handlelogout = () => {
        // localStorage.removeItem('loginstatus');
        dispatch(logoutRequest());
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (
        <div className="main-header">
            <div id="topbar" className={`d-flex align-items-center fixed-top ${theme.theme}`}>
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
                        <div>
                            <Link to={"/cart"}>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={CartCount} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton>
                            </Link>
                            <Link to={"/favourite"}>
                                <IconButton aria-label="favourite">
                                    <StyledBadge>
                                        <FavoriteIcon sx={{ color: red[500] }} />
                                    </StyledBadge>
                                </IconButton>
                            </Link>

                            <button onClick={() => theme.themeToggle(theme.theme)}>Theme</button>
                        </div>
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
                            {/* <li><Link className="nav-link scrollto" to={'/Mcounter'}>Counter</Link></li> */}
                            <li><Link className="nav-link scrollto" to={'/CallBack'}>CallBack</Link></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>
                    <Link to="/Appointment"><CustomButton val={'Make Appointment'} /></Link>
                    {
                        auth.user ?
                            <Link to="/Auth1" onClick={handlelogout}>
                                <CustomButton val={'Logout'} />
                            </Link>
                            : <Link to="/Auth1" >
                                <CustomButton val={'Login/Signup'} />
                            </Link>
                    }
                </div>
            </header>
        </div>

    );
}

export default Header;