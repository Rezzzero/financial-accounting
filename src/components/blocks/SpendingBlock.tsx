import { useState } from "react";
import AmountCard from "../cards/AmountCard";
import { useSelector } from "react-redux/es/hooks/useSelector";
import AmountModal from "../modals/AmountModal";
import { Link } from "react-router-dom";

const SpendingBlock = ({ SpendingTitle }: any) => {
 const [modal, toggleModal] = useState(false);
 const amountSpent = useSelector((state: any) => state.amount.amount);
 
 const totalAmounts = amountSpent.reduce((acc: number, elem: any) => {
  return acc + parseFloat(elem.amountSpent);
}, 0);
 return (
  <div className="p-10 ">
   <h3 className="font-semibold text-xl mb-3 w-80">
    {SpendingTitle} {totalAmounts} руб
   </h3>
   <div className="card max-w-max flex flex-wrap rounded-md shadow-md p-5">
    {amountSpent.map((elem: any) => {
     return (
      <AmountCard
       AccountTitle={elem.nameExpenses}
       AccountAmount={elem.amountSpent}
       icon={elem.image}
       key={elem.id}
       imageBg={' '}
      ></AmountCard>
     );
    })}
    <Link to={"/spending"}
     className="group hover:bg-violet-600  pl-20 pr-20 h-16 mr-2 mb-2 m-1 border-solid border-y border-x drop-shadow-lg rounded-md"
     onClick={() => toggleModal(true)}
    >
     <svg
      className="h-8 w-8 text-gray-400 group-hover:text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
     >
      <line x1="12" y1="5" x2="12" y2="19" />{" "}
      <line x1="5" y1="12" x2="19" y2="12" />
     </svg>
    </Link>
   </div>
   {modal && <AmountModal toggleModal={toggleModal} />}
  </div>
 );
};

export default SpendingBlock;
