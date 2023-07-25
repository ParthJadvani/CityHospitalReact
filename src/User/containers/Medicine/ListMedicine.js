import React from 'react';
import CustomCard from '../../components/UI/CustomCard';

function ListMedicine({ mdata, handleCart }) {
    return (
        <>
            {
                mdata.map((v,i) => {
                    return(
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
        </>
    );
}

export default ListMedicine;