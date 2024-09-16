import { useDispatch, useSelector } from "react-redux";
import { addAmountToAccount } from "../../store/amountSlice";
import { useState } from "react";

const ExpensesAddModal = ({ toggleModal }: { toggleModal: any }) => {
  const [amountSpent, setAmountSpent] = useState();
  // const [amountError, setAmountError] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const accounts = useSelector((state: any) => state.amount.amount);
  const dispatch = useDispatch();

  const handleAddAccount = () => {
    dispatch(
      addAmountToAccount({
        accountId: selectedAccount,
        additionalAmount: amountSpent,
      })
    );

    toggleModal(false)
  };

const handlesetSelectedAccount = (e: any) => {
  setSelectedAccount(e.target.value);
}
  const handleAccountChange = (e: any) => {
    setAmountSpent(e.target.value);
  };
 return (
  <div className="fixed inset-0 z-50">
   <div className="flex h-screen w-screen justify-center items-center ">
    <div className="justify-center w-96 bg-white p-9 border-x border-y rounded-md">
     <div className="text-lg  w-full">
      <div className="w-80">
       <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
       >
        Select an option
       </label>
       <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handlesetSelectedAccount}
        value={selectedAccount}
       >
        <option selected>Choose a expenses СОСАЛ???</option>
        {accounts.map((elem: any) => {
                    return (
                        <option key={elem.id} value={elem.nameExpenses}>
                    {elem.nameExpenses}
                  </option>
                    )
        })}
    
       </select>
       <label className="mb-4">Сколько потратили:</label>
       <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
        name="myInput"
        type="number"
        value={amountSpent}
        onChange={handleAccountChange}
       />
       {/* <div>{amountError}</div> */}
       <div className="flex justify-between mt-10">
        <button
         className=" rounded px-4 py-2 text-white   bg-gray-300"
         onClick={() => {
          handleAddAccount();
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
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ExpensesAddModal;
