import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Favourite(props) {

    const dispatch = useDispatch();
    let medicineData = useSelector((state) => state.medicine);
    let favData = useSelector((state) => state.favourite);

    console.log(favData);
    console.log(medicineData);

    let favItems = favData.items.map((v) => {
        let mdata = medicineData.medicine.find((m) => m.id === v.fid);

        let fdata = { ...mdata, ...v };

        // subTotal = v.qty * mdata.price;

        return fdata;
    });

    console.log(favItems);

    return (
        <section id="favourite" className="favourite">
            <div className="container">
                <div className="section-title">
                    <h2>Favourite</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Aenean ac turpis ante. Mauris velit sapien, aliquet aliquet rhoncus quis,
                        luctus at neque. Mauris sit amet massa sed orci vehicula facilisis.</p>
                </div>
                {
                    favItems.map((c) => {
                        return (

                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            {/* <div>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp" className="img-fluid rounded-3" alt="Shopping item" style={{ width: 65 }} />
                                </div> */}
                                            <div className="ms-3">
                                                <h5>I{c.name}</h5>
                                                <p className="small mb-0">{c.desc.substring(0, 50)}...</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div style={{ width: 130 }}>
                                                <h5 className="mb-0">Rs.{c.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default Favourite;