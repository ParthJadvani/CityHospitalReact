import React, { useCallback, useState } from 'react';
import Heading from '../components/UI/Heading/Heading';
import Callbacklist from './Callbacklist';

function Callbackexample(props) {
    const [number, setNumber] = useState(1);
    const [theme, setTheme] = useState(false);

    const Bgcolor = {
        background: theme ? '#000' : '#ff6',
        color: theme ? '#ff6' : '#000',
        width: '100px',
        height: '100px'
    }

    const getitem = useCallback((n) => {
        return [number, number+n, number+n+3]
    }, [number]);

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <Heading type='h2'>CallBack</Heading>
                    <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                </div>
                <div>
                    <input
                        name='list'
                        type='text'
                        placeholder='Enter list Number'
                        onChange={(e) => setNumber(parseInt(e.target.value))}
                    />
                    <Callbacklist item={getitem}/>
                </div>
                <hr/>
                <div>
                    <div style={Bgcolor}>Hello</div>
                    <button  onClick={() => setTheme(!theme)}>Change BG</button>
                </div>
            </div>
        </section>
    );
}

export default Callbackexample;