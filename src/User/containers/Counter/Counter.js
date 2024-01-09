import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../Redux/Action/counter.action';

function Counter(props) {
    const dispach = useDispatch();
    const counterVal = useSelector(state => state.counter)

    const handleDec = () => {
        dispach(decrement());
    }

    const handleInc = () => {
        dispach(increment());
    }

    return (
        <div>
            <br></br>
            <br></br>
            <button onClick={() => handleDec()}>-</button>
            <span>{counterVal.count}</span>
            <button onClick={() => handleInc()}>+</button>
        </div>
    );
}

export default Counter;