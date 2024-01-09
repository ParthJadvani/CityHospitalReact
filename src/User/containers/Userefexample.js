import React, { useEffect, useRef, useState } from 'react';
import Heading from '../components/UI/Heading/Heading';

function Userefexample(props) {
    const [name, setName] = useState('');

    const ref = useRef(0);

    const nameRef = useRef('');

    useEffect(() => {
        ref.current = ref.current + 1;

        console.log(nameRef.current.value);
    }, [name]);

    const handleFocus = (nVal) => {
        nVal.current.style.backgroundColor = 'red'
    }


    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <Heading type='h2'>Use Reference</Heading>
                    <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                </div>
                <div>
                    <input
                        type='text'
                        ref={nameRef}
                        onFocus={() => handleFocus(nameRef)}
                        onChange={(e) => setName(e.target.value)} 
                    />

                    <p>Your name is: {name}</p>
                    <p>Rendring time: {ref.current}</p>
                </div>
            </div>
        </section>
    );
}

export default Userefexample;