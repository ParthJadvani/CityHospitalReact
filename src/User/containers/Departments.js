import React, { useContext, useEffect } from 'react';
import Heading from '../components/UI/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment } from '../../Redux/Action/department.action';
import { fetchDepartments } from '../../Redux/Slice/departmentSlice';
import { ThemeContext } from '../../Context/ThemeContext';

function About(props) {

    const dispatch = useDispatch();
    const depadata = useSelector(state => state.department);

    // console.log(depadata.department);
    useEffect(() => {
        dispatch(fetchDepartments());
        // dispatch(getDepartment());
    }, []);

    let theme = useContext(ThemeContext);


    return (
        <section id="departments" className={`${theme.theme} departments`}>
            <div className="container">
                <div className="section-title">
                    <h2 className={`${theme.theme}`}>Departments</h2>
                </div>
                <div className={`${theme.theme} row`}>
                    <div className="col-lg-3">
                        <ul className="nav nav-tabs flex-column">
                            {
                                depadata.department.map((v, i) => {
                                    return (
                                        <li className={`${theme.theme} nav-item`}>
                                            <a className={i === 0 ? `nav-link active show ${theme.theme} ` : `${theme.theme} nav-link`} data-bs-toggle="tab" href={`#tab-${i + 1}`}>{v.name}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-lg-9 mt-4 mt-lg-0">
                        <div className="tab-content">
                            {
                                depadata.department.map((v, i) => {
                                    return (
                                        <div className={i === 0 ? "tab-pane active show" : "tab-pane"} id={`tab-${i + 1}`}>
                                            <div className="row">
                                                <div className="col-lg-8 details order-2 order-lg-1">
                                                    <h3 className={`${theme.theme}`}>{v.name}</h3>
                                                    <p className={`${theme.theme} fst-italic`}>{v.desc}</p>
                                                </div>
                                                <div className="col-lg-4 text-center order-1 order-lg-2">
                                                    <img src={v.prec} alt className="img-fluid" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default About;