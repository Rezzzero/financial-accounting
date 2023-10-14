// import React from 'react';

const MoneyDisplay = ({money, title}: any) => {
    return (
        <div className='h-20 bg-sky-50 w-48 center'>
            <div className="inner-card text-center p-2">
            <p>{title}</p>
            <p>{money} руб</p>
            </div>
        </div>
    );
};

export default MoneyDisplay;