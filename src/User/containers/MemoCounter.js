import React, { useMemo, useState } from 'react';
import Heading from '../components/UI/Heading/Heading';

function MemoCounter(props) {

    const [count, setCount] = useState(0);
    const [number, setNumber] = useState(0);

    const handleDec = () => {
        // console.log("decrease");
        setCount(count - 1);
    }

    const handleInc = () => {
        // console.log("increase");
        setCount(count + 1);
    }

    const handleFact = () => {
        console.log("ghghghgggh");
        let fact = 1;
        if (number > 1) {
            for(let i = 1; i <= number; i++) {
                fact *= i;
            }
        }
        return fact;
    }

    const result = useMemo(() => {
        return handleFact();
    }, [number])

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <Heading type='h2'>Memo Counter</Heading>
                    <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                </div>
                <div>
                    <input
                        name='fac'
                        type='text'
                        placeholder='Enter Fact Number'
                        onChange={(e) => setNumber(parseInt(e.target.value))}
                    />
                    <span>Factorial Value: {result}</span>
                </div>
                <div>
                    <button onClick={() => handleDec()}>-</button>
                    <span>{count}</span>
                    <button onClick={() => handleInc()}>+</button>
                </div>
            </div>
        </section>
    );
}

export default MemoCounter;