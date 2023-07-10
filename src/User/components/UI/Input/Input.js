import React from 'react';
import { Baseinput, InputErr } from './input.style';

function Input({ errors, ...rest }) {
    return (
        <>
        <Baseinput
        className="form-control"
        {...rest}
        errors={errors}
        />

        <InputErr errors={errors}>{errors}</InputErr>
        </>
    );
}

export default Input;