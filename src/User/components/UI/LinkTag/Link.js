import React from 'react';
import { BaseLink } from './link.style';

function Link({ children, className }) {
    return (
        <BaseLink href='#' className={className}>
            {children}
        </BaseLink>
    );
}

export default Link;