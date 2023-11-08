import { useSelector } from "react-redux";
import AmountCard from "../cards/AmountCard";
import { Link } from "react-router-dom";

const AccountBlock = ({ text }: any) => {
 const account = useSelector((state: any) => state.account.account);
 const totalAmounts = account.reduce((acc: number, elem: any) => {
  return acc + parseFloat(elem.fund);
 }, 0);

 return (
  <div className="p-10 ">
   <h3 className="font-semibold text-xl mb-3 w-80">
    {text} {totalAmounts} руб
   </h3>
   <div className="card max-w-max flex flex-wrap rounded-md shadow-md p-5">
    {account.map((elem: any) => {
     return (
      <AmountCard
       AccountTitle={elem.nameAccount}
       AccountAmount={elem.fund}
       imageBg={elem.imageBg}
       key={elem.id}
      ></AmountCard>
     );
    })}
    <Link
     to="/account"
     className="group hover:bg-violet-600  pl-20 pr-20 h-16 mr-2 mb-2 m-1 border-solid border-y border-x drop-shadow-lg rounded-md"
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
  </div>
 );
};

export default AccountBlock;
