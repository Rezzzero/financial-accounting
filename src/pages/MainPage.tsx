import SpendingBlock from "../components/cards/SpendingBlock";

const MainPage = () => {
 return (
  <div className="div">
   {/* <AmountBlock data={cards} text={'Счета'}></AmountBlock> */}
   <SpendingBlock SpendingTitle={"Расходы"}></SpendingBlock>
  </div>
 );
};

export default MainPage;
