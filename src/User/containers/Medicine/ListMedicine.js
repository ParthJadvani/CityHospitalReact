import React from 'react';
import CustomCard from '../../components/UI/CustomCard';

function ListMedicine({ mdata }) {
    return (
        <>
            {
                mdata.map((v,i) => {
                    return(
                        <div className='col-md-4 g-4'>
                            <CustomCard value={v}/>
                        </div>
                    )
                })
            }
        </>
    );
}

export default ListMedicine;