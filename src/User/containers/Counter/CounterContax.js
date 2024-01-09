import { useState, createContext } from 'react';

const counterContext = createContext();

export const CounterProvider = ({ children }) => {

    const [counter, setCounter] = useState(0);

    const increment = () => {
        return setCounter(counter + 1);
    }

    const decrement = () => {
        return setCounter(counter - 1);
    }

    return (
        <counterContext.Provider value={{ counter, increment, decrement }}>
            {children}
        </counterContext.Provider>
    )
}

export default counterContext;