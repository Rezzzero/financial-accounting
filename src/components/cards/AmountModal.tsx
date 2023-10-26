import React, { useState } from 'react';
import InputBlock from '../inputBlock';

const AmountModal = (props : any) => {
    return (
        <div className="fixed inset-0 z-50   ">
            <div className="flex h-screen w-screen justify-center items-center ">
                <div className="justify-center w-96 bg-white p-9 border-x border-y rounded-md">
                    <div className="text-lg  w-full" >
                        <InputBlock modalFunc={props.setModalOn} titleAccount={'Название траты'} amountAccount={'Сколько потратили'} titleImageField={'Иконка'}></InputBlock></div>
                </div>
            </div>
        </div>
    );
};

export default AmountModal;

