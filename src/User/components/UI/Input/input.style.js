import { styled } from "styled-components";

export const Baseinput = styled.input`
    border: 1px solid ${props => props.errors !== '' ? 'red' : 'black' };
`;

export const InputErr = styled.span`
    display: ${props => props.errors !== '' ? 'inline-block' : 'none' };
    color: red;
`