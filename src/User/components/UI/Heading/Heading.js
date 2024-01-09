import React from 'react';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Paragraph } from './heading.style';

function Heading({children, type }) {

    const checktype = () => {
        switch (type) {
            case 'h1':
                return Heading1;
            case 'h2':
                return Heading2;
            case 'h3':
                return Heading3;
            case 'h4':
                return Heading4;
            case 'h5':
                return Heading5;
            case 'h6':
                return Heading6;
            case 'p':
                return Paragraph;
            default:
                return Paragraph;
        }
    }

    const Headingtype = checktype();


    return (
        <Headingtype>{children}</Headingtype>
    );
}

export default Heading;