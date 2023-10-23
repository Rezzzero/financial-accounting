// import React from 'react';
import { useState, useRef } from 'react';
import AmountBlock from '../components/cards/AmountBlock';
import { addAccount } from '../store/amountSlice';
import { useDispatch } from 'react-redux';




const MainPage = () => {
    const [amount, setAmount] = useState('')
    const [title, setTitle] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const addAmount = ():any => {
        dispatch(addAccount({amount,title,selectedImage}))
        setTitle(''); 
        setAmount('');
        setSelectedImage(null)
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
        <div className="div">
            {/* <AmountBlock data={cards} text={'Счета'}></AmountBlock> */}
            <AmountBlock data={amount} text={'Расходы'}></AmountBlock>
            Название: <input name="myInput" type="text" value={title} onChange={handleTitleChange} />
            Сумма: <input name="myInput" type="number" value={amount} onChange={handleAmountChange} />
            Иконка: <input type="file" accept="media/*" onChange={onImageChange} ref={fileInputRef} />

            <button onClick={addAmount}>Добавить</button>
        </div>
    );
};

export default MainPage;