// import React from 'react';
import AmountBlock from '../components/cards/AmountBlock';

const cards = [
{   money: '32 000',
    title: 'tinkoff',
    icon: 'media/551e4f2f90796a073d9beb69ac2daa48.jpg'
},
{    money: '500',
    title: 'qiwi',
    icon: 'media/551e4f2f90796a073d9beb69ac2daa48.jpg'
},
{    money: '2400',
    title: 'alfa',
    icon: 'media/551e4f2f90796a073d9beb69ac2daa48.jpg'
},
{    money: '0',
    title: 'sber',
    icon: 'media/551e4f2f90796a073d9beb69ac2daa48.jpg'
},
]
const amount = [
{   money: '10 440',
    title: 'Продукты',
    icon: 'media/551e4f2f90796a073d9beb69ac2daa48.jpg'
},
{    money: '5500',
    title: 'Онлайн товары',
    icon: 'media/551e4f2f90796a073d9beb69ac2daa48.jpg'
},
{    money: '3000',
    title: 'Фаст-фуд',
    icon: 'media/551e4f2f90796a073d9beb69ac2daa48.jpg'
},
{    money: '1500',
    title: 'Такси',
    icon: 'media/551e4f2f90796a073d9beb69ac2daa48.jpg'
},
]


const MainPage = () => {
    return (
        <div className="div">
            <AmountBlock data={cards} text={'Счета'}></AmountBlock>
            <AmountBlock data={amount} text={'Расходы'}></AmountBlock>
        </div>
    );
};

export default MainPage;