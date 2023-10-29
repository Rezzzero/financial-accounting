import AccountBlock from "../components/blocks/AccountBlock";
import SpendingBlock from "../components/blocks/SpendingBlock";

const MainPage = () => {
 return (
  <div className="div">
   <AccountBlock text={'Счета'}></AccountBlock>
   <SpendingBlock SpendingTitle={"Расходы"}></SpendingBlock>
  </div>
 );
};

export default MainPage;
