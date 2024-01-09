import React from 'react';
import { styled } from 'styled-components';

const BaseButton = styled.button`
    border: 0;
    padding: 10px 35px;
    transition: 0.4s;
    border-radius: 50px;
    margin: 10px;
`

export const primarybutton = styled(BaseButton)`
    background: #FF6337;
    color: #fff;

    &:hover {
        background: #1c84e3;
}`

export const secondrybutton = styled(BaseButton)`
    background: #000;
    color: #fff;

    &:hover {
        background: blue;
}`

export const outlinebutton = styled(BaseButton)`
    background:${props => props.disabled ? 'gray' : 'none'};
    color: #000;
    border: 2px solid black;

    &:hover {
        background: ${props => props.disabled ? 'gray' : '#1c84e3'};
}`
