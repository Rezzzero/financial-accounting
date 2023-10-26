// import React from 'react';
import { useState, useRef } from 'react';
import AmountBlock from '../components/cards/AmountBlock';




const MainPage = () => {
    const [amount, setAmount] = useState('')


    return (
        <div className="div">
            {/* <AmountBlock data={cards} text={'Счета'}></AmountBlock> */}
            <AmountBlock data={amount} text={'Расходы'}></AmountBlock>
        </div>
    );
};

export default MainPage;