import React from 'react';
import AmountCard from './AmountCard';

const AmountBlock = ({data, text}: any) => {
    console.log(data)
    return (
        <div className='p-10 w-screen'>
            <h3 className="font-semibold text-xl mb-3 w-80">{text}</h3>
            <div className="card max-w-max flex flex-wrap rounded-md shadow-md  p-5 ">
            {data.map((elem: any) => {
                return (
                    <AmountCard title={elem.title} money={elem.money} icon={elem.icon}></AmountCard>
                )
            })
            }
        </div>
    </div>
    );
};

export default AmountBlock;