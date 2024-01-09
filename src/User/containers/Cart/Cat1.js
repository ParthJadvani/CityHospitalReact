import React, { useEffect, useState } from 'react';
import { json } from 'react-router-dom';

function Cat1(props) {
    const [medicineData, setmedicineData] = useState([]);
    const [localdata, setLocaldata] = useState([]);

    
    useEffect(() => {
        let localdata = JSON.parse(localStorage.getItem("CardId"));
        setLocaldata(localdata);
        try {
            fetch("http://localhost:3004/medicine")
                .then((response) => response.json())
                .then((data) => setmedicineData(data))
                .catch((error) => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }, []);

    let cartItems = localdata.map((v) => {
        let mdata = medicineData.find((m) => m.id == v.pid);

        let fdata = { ...mdata, ...v };

        return fdata;
    });
    console.log(cartItems);
    let subTotal = cartItems.reduce((acc, v) => acc + v.price * v.qty, 0);

    const handleDec = (id) => {
        // console.log(id);

        let data = localdata.map((v) => {
            if (v.pid === id && v.qty > 1) {
                return {...v, qty: v.qty - 1}
            } else {
                return v;
            }
        });
        setLocaldata(data);
        localStorage.setItem("CardId", JSON.stringify(data));
    }

    const handleInc = (id) => {
        // console.log(id);
        let data = localdata.map((v) => {
            if (v.pid === id) {
                return {...v, qty: v.qty + 1}
            } else {
                return v;
            }
        });
        setLocaldata(data);
        localStorage.setItem("CardId", JSON.stringify(data));
    }

    const handleDelCart = (id) => {
        console.log(id);
        let fadata = localdata.filter((v) => v.pid !== id);

        setLocaldata(fadata);
        localStorage.setItem("CardId", JSON.stringify(fadata));
    }


    return (
        <section id="medicine" className="medicine">
            <div className="container">
                <div className="section-title">
                    <h2>Cart</h2>
                </div>

                {
                    cartItems.map((c) => {
                        return (

                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="ms-3">
                                                <h5>I{c.name}</h5>
                                                <p className="small mb-0">{c.desc}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="d-flex mx-5" style={{ width: 150 }}>
                                                <button className="btn btn-link px-2" onClick={() => handleDec(c.pid)}>
                                                    <i className="fas fa-minus" />
                                                </button>
                                                <input id="form1" min={1} name="quantity" value={c.qty} type="text" className="form-control form-control-sm" />
                                                <button className="btn btn-link px-2" onClick={() => handleInc(c.pid)}>
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </div>
                                            <div style={{ width: 130 }}>
                                                <h5 className="mb-0">Rs.{c.price * c.qty}</h5>
                                            </div>
                                            <a style={{ color: '#cecece' }}><i className="fas fa-trash-alt" onClick={() => handleDelCart(c.pid)} /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="card mb-4">
                    <div className="card-body">
                        <p><strong>Subtotal</strong></p>
                        <p>{subTotal}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cat1;