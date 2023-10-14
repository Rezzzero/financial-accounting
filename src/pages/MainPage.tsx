// import React from 'react';
import MoneyDisplay from '../components/cards/MoneyDisplay';

const cards = [
        {   money: 1231,
    title: 'tinkoff'},
{    money: 3213131231,
    title: 'qiwi',},
{    money: 2131,
    title: 'alfa',},
{    money: 21313,
    title: 'sber'},
]


const MainPage = () => {
    return (
        <div>
            {cards.map(elem => {
                return (
                <MoneyDisplay money={elem.money} title={elem.title}/>
                )
            })
            }   
        </div>
    );
};

export default MainPage;