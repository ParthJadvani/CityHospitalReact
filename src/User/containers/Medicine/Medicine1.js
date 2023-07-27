import React from 'react';
import CustomCard from '../../components/UI/CustomCard';

function Medicine1(props) {
    return (
        <section id="medicine" className="medicine">
            <div className="container">
                <div className="section-title">
                    <h2>Medicine1111111</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Aenean ac turpis ante. Mauris velit sapien, aliquet aliquet rhoncus quis,
                        luctus at neque. Mauris sit amet massa sed orci vehicula facilisis.</p>
                </div>
                <div className='col-md-4 g-4'>
                    <CustomCard
                        value={"ff"}
                        btnVal={"Add to Cart"}
                        // handleCart={handleCart}
                    />
                </div>
            </div>
        </section>
    );
}

export default Medicine1;