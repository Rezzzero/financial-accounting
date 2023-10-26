import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAccount } from '../store/amountSlice';
import DropzoneFile from './DropzoneFile';

const InputBlock = (props:any) => {
    console.log(props)

    const fileInputRef = useRef(null);
    const [amount, setAmount] = useState('')
    const [title, setTitle] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [amountError, setAmountError] = useState('');

    const dispatch = useDispatch()
    const addAmount = ():any => {
        if(title != '' && amount != ''){
            dispatch(addAccount({amount,title,selectedImage}))
            setTitle(''); 
            setAmount('');
            setSelectedImage(null)   
            setAmountError('');
        }else{
            setAmountError('Поле не может быть пустым')
        }
    }

    const handleTitleChange = (e:any) => {
        setTitle(e.target.value);
    };
    const handleAmountChange = (e:any) => {
        setAmount(e.target.value);
    };
    const onImageChange = (e:any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <div className='w-80'>
            <label className='pb-4'>{props.titleAccount}:</label> 
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full' name="myInput" type="text" value={title} onChange={handleTitleChange} />
            <label className='mb-4'>{props.amountAccount}:</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full' name="myInput" type="number" value={amount} onChange={handleAmountChange} />
            <label className='mb-4'>{props.titleImageField}:</label>
                <DropzoneFile onChange={onImageChange} ref={fileInputRef} ></DropzoneFile>
                <div>{amountError}</div> 
            <div className="flex justify-between mt-10">
                <button className=" rounded px-4 py-2 text-white   bg-gray-300" onClick={() => { addAmount(); props.modalFunc(false); }}>Добавить</button>
                <button className=" rounded px-4 py-2 text-white bg-gray-300" onClick={() => props.modalFunc(false)}>Закрыть</button>
            </div>
        </div>
    );
};

export default InputBlock;