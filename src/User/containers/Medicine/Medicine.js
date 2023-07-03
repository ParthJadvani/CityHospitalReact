import React, { useEffect, useState } from 'react';
import ListMedicine from './ListMedicine';

function Medicine(props) {
    const [Data, setData] = useState([]);
    const [filterdata, setFilterdata] = useState([]);


    useEffect(() => {
        let localdata = JSON.parse(localStorage.getItem('medicine'));

        if (localdata) {
            setData(localdata);
        }
    }, []);

    const handlechange = (val) =>{
        
        let localdata = JSON.parse(localStorage.getItem('medicine'));

        let fdata = localdata.filter((v) => 
                v.name.toLowerCase().includes(val.toLowerCase()) ||
                v.price.toString().includes(val) ||
                v.date.toString().includes(val) ||
                v.desc.toLowerCase().includes(val.toLowerCase())
        )
        console.log(fdata);

        setFilterdata(fdata);
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
                    <input type='search'
                        name='search'
                        placeholder='search'
                        onChange={(e) => handlechange(e.target.value)}
                    />
                    <ListMedicine mdata={filterdata.length > 0 ? filterdata : Data}/>
                </div>
            </div>
        </section>
    );
}

export default Medicine;