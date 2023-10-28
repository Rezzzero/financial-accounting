import { useRef, useState } from "react";
import DropzoneFile from "../DropzoneFile";
import { useDispatch } from "react-redux";
import { addAmount } from "../../store/amountSlice";

const AmountModal = ({ toggleModal }: any) => {
 const fileInputRef = useRef(undefined);
 const [amount, setAmount] = useState<number>();
 const [title, setTitle] = useState("");
 const [selectedImage, setSelectedImage] = useState<string>();
 const [amountError, setAmountError] = useState("");

 const dispatch = useDispatch();

 const addAmounts = () => {
  if (title != "" && amount != undefined) {
   dispatch(addAmount({ amount, title, selectedImage }));
   setTitle("");
   setAmount(undefined);
   setSelectedImage(undefined);
   setAmountError("");
  } else {
   setAmountError("Поле не может быть пустым");
  }
 };
console.log(addAmount)
 const handleTitleChange = (e: any) => {
  setTitle(e.target.value);
 };
 const handleAmountChange = (e: any) => {
  setAmount(e.target?.result?.parseFloat());
 };
 const onImageChange = (e: any) => {
  const file = e.target.files[0];
  if (file) {
   const reader = new FileReader();
   reader.onload = (event) => {
    setSelectedImage(event.target?.result?.toString());
   };
   reader.readAsDataURL(file);
  } else {
   setSelectedImage(undefined);
  }
 };

 return (
  <div className="fixed inset-0 z-50   ">
   <div className="flex h-screen w-screen justify-center items-center ">
    <div className="justify-center w-96 bg-white p-9 border-x border-y rounded-md">
     <div className="text-lg  w-full">
      <div className="w-80">
       <label className="pb-4">Название траты:</label>
       <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
        name="myInput"
        type="text"
        value={title}
        onChange={handleTitleChange}
       />
       <label className="mb-4">Сколько потратили:</label>
       <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
        name="myInput"
        type="number"
        value={amount}
        onChange={handleAmountChange}
       />
       <label className="mb-4">Иконка траты:</label>
       <DropzoneFile onChange={onImageChange} ref={fileInputRef}></DropzoneFile>
       <div>{amountError}</div>
       <div className="flex justify-between mt-10">
        <button
         className=" rounded px-4 py-2 text-white   bg-gray-300"
         onClick={() => {
          addAmounts();
          toggleModal(false);
         }}
        >
         Добавить
        </button>
        <button
         className=" rounded px-4 py-2 text-white bg-gray-300"
         onClick={() => toggleModal(false)}
        >
         Закрыть
        </button>
       </div>
      </div>{" "}
     </div>
    </div>
   </div>
  </div>
 );
};

export default AmountModal;