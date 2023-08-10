import React, { useContext } from 'react';
import counterContext from './CounterContax';

function Counter12() {
    const { counter, increment, decrement } = useContext(counterContext);
    return (
        <section id="medicine" className="medicine">
                <div className="container">
                    <div className="section-title">
                        <h1>Counter Context</h1>
                    </div>
                    <div className="count-wrapper">
                        <button onClick={increment}>+</button>
                        <span>{counter}</span>
                        <button onClick={decrement}>-</button>
                    </div>
                </div>
        </section>
    );
}

export default Counter12;