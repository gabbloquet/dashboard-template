import React from 'react';
import './NumberedCard.style.scss'

const NumberedCard = ({number, children}) => {
    return (
        <div className='numbered-card'>
            <section className='number'>{number}</section>
            <section>{children}</section>
        </div>
    );
}

export default NumberedCard;
