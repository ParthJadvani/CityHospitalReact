import React from 'react';
import { BaseButton, outlinebutton, primarybutton, secondrybutton } from './Button.style';

function Button({ children, type, disable=false }) {
    
    const checktype = () => {
        switch(type) {
            case 'primary' :
                return primarybutton;
            case 'secondry' :
                return secondrybutton;
            case 'outline' :
                return outlinebutton;
            default :
                return primarybutton;
        }
    }

    const Buttontype = checktype();

    return (
        <Buttontype disabled={disable}>
            {children}
        </Buttontype>
    );
}

export default Button;