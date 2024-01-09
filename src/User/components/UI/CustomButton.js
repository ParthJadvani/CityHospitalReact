import React from 'react';
import Styled from 'styled-components'

function CustomButton({val}) {
    const Btn = Styled.button`
    background: #FF6337;
    border: 0;
    padding: 10px 35px;
    color: #fff;
    transition: 0.4s;
    border-radius: 50px;
    margin: 10px;

    &:hover {
        background: #1c84e3;
    }
    `
    return (
        <Btn>
            {val}
        </Btn>
    );
}

export default CustomButton;