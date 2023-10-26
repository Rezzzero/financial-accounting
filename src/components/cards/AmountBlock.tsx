import  { useState } from 'react';
import AmountCard from './AmountCard';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import AmountModal from './AmountModal';

const AmountBlock = ({data,text}: any) => {
    const [modalOn, setModalOn] = useState(false)
    const account = useSelector((state: any) => state.account.account)
    console.log(data)
    return (
<div className="p-10 w-screen">
<h3 className="font-semibold text-xl mb-3 w-80">{text}</h3>
<div className="card max-w-max flex flex-wrap rounded-md shadow-md p-5">
  {account.map((elem: any) => {
    return (
      <AmountCard title={elem.title} money={elem.amount} icon={elem.image} key={elem.title}></AmountCard>
    );
  })}
  <button  className=" ml-3"onClick={() => setModalOn(true)}><svg className="h-8 w-8  text-gray-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
</button>
</div>
{modalOn && <AmountModal setModalOn={setModalOn} />}
</div> 

    );
};

export default AmountBlock;

