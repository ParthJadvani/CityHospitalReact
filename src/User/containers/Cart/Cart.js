import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decCart, incCart, removeCart } from '../../../Redux/Action/cart.action';
// import { decQty, incqQty, removeItem } from '../../../Redux/Slice/cartSlice';

function Cart(props) {

    const dispatch = useDispatch();
    let medicineData = useSelector((state) => state.medicine);
    let cartData = useSelector((state) => state.cart);

    console.log(medicineData);
    console.log(cartData);

    // let subTotal = 0;
    let cartItems = cartData.items.map((v) => {
        let mdata = medicineData.medicine.find((m) => m.id === v.pid);

        let fdata = { ...mdata, ...v };

        // subTotal = v.qty * mdata.price;

        return fdata;
    });

    
    // let subTotal = cartItems.map((v) => v.price * v.qty).reduce((acc, v) => acc + v.price,0);
    let subTotal = cartItems.reduce((acc, v) => acc + v.price * v.qty, 0);

    const handleInc = (id) => {
        // console.log(id);
        dispatch(incCart(id));
    }

    const handleDec = (id) => {
        // console.log(id);
        dispatch(decCart(id));
    }

    const handleDelCart = (id) => {
        console.log(id);
        dispatch(removeCart(id));
    }

    console.log(cartItems);

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
                                            {/* <div>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp" className="img-fluid rounded-3" alt="Shopping item" style={{ width: 65 }} />
                                </div> */}
                                            <div className="ms-3">
                                                <h5>I{c.name}</h5>
                                                <p className="small mb-0">{c.desc.substring(0, 50)}...</p>
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

export default Cart;