import React from 'react';
import { Baseinput } from './input.style';

function Input({ type, name, value, onBlur, onChange, placeholder }) {
    return (
        <Baseinput
        type={type} 
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        />
    );
}

export default Input;