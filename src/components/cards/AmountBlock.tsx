import React from 'react';
import AmountCard from './AmountCard';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

const AmountBlock = ({data,text}: any) => {
    const account = useSelector((state: any) => state.account.account)
    console.log(data)
    return (
        <div className='p-10 w-screen'>
            <h3 className="font-semibold text-xl mb-3 w-80">{text}</h3>
            <div className="card max-w-max flex flex-wrap rounded-md shadow-md  p-5 ">
            {account.map((elem: any) => {
                return (
                    <AmountCard title={elem.title} money={elem.amount} icon={elem.image }key={elem.title} ></AmountCard>
                )
            })
            }
        </div>
    </div>
    );
};

export default AmountBlock;