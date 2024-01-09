import React, { useEffect, useState } from 'react';
import CustomCard from '../../components/UI/CustomCard';
import { json } from 'react-router-dom';

function Medicine1(props) {
    const [getData, setGetData] = useState([]);

    useEffect(() => {
        try {
            fetch("http://localhost:3004/medicine")
                .then((response) => response.json())
                .then((data) => setGetData(data))
                .catch((error) => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }, []);


    const handleCart = (id) => {
        console.log(id);

        let localdata = JSON.parse(localStorage.getItem("CardId"));

        if (localdata === null) {
            localStorage.setItem("CardId", JSON.stringify([{
                pid: id,
                qty: 1,
            }]));
        } else {
            let mdata = localdata.find((m) => m.pid == id);
            if (mdata) {
                mdata.qty++;
                localStorage.setItem('CardId', JSON.stringify(localdata));
            } else {
                localdata.push({ 
                    pid: id, 
                    qty: 1 
                });
                localStorage.setItem('CardId', JSON.stringify(localdata));
            }
        }
    }

    return (
        <section id="medicine" className="medicine">
            <div className="container">
                <div className="section-title">
                    <h2>Medicine</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Aenean ac turpis ante. Mauris velit sapien, aliquet aliquet rhoncus quis,
                        luctus at neque. Mauris sit amet massa sed orci vehicula facilisis.</p>
                </div>
                <div className='row'>
                    {
                        getData.map((v, i) => {
                            return (
                                <div className='col-md-4 g-4'>
                                    <CustomCard
                                        value={v}
                                        btnVal={"Add to Cart"}
                                        handleCart={handleCart}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Medicine1;