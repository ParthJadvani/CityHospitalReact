import React from 'react';
import { useParams } from 'react-router-dom';

const data = [
    {
        id: 1,
        name: 'Atha Smith',
        designation: 'Chief Medical Officer',
        description: 'Duis sagittis rutrum neque, quis tincidunt arcu pretium ac.',
        about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        url: '../assets/img/doctors/doctors-1.jpg'
    },
    {
        id: 2,
        name: 'John White',
        designation: 'Anesthesiologist',
        description: 'Aenean ac turpis ante. Mauris velit sapien.',
        about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        url: '../assets/img/doctors/doctors-2.jpg'
    },
    {
        id: 3,
        name: 'Umika Loha',
        designation: 'Cardiology',
        description: 'Curabitur luctus eleifend odio. Phasellus placerat mi.',
        about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        url: '../assets/img/doctors/doctors-3.jpg'
    },
    {
        id: 4,
        name: 'Daimy Smith',
        designation: 'Neurosurgeon',
        description: 'Morbi vulputate, tortor nec pellentesque molestie, eros nisi ornare purus.',
        about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        url: '../assets/img/doctors/doctors-4.jpg'
    },
]

function Docdescription(props) {
    const { id } = useParams();

    const fdata = data.filter((v, i) => v.id === parseInt(id))[0];

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        <div className="member d-flex align-items-start">
                            <div className="pic des"><img src={fdata.url} className="img-doctordes" alt /></div>
                            <div className="member-info">
                                <h4>{fdata.name}</h4>
                                <span>{fdata.designation}</span>
                                <p>{fdata.description}</p>
                                <p>{fdata.about}</p>
                                <div className="social">
                                    <a href><i className="ri-twitter-fill" /></a>
                                    <a href><i className="ri-facebook-fill" /></a>
                                    <a href><i className="ri-instagram-fill" /></a>
                                    <a href> <i className="ri-linkedin-box-fill" /> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Docdescription;