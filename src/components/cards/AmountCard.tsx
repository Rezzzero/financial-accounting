const AmountCard = ({ AccountTitle, AccountAmount, icon }: any) => {
 return (
  <div className="mr-2 mb-3 border-solid border-y border-x drop-shadow-lg rounded-md w-52 h-16 center m-1 flex items-center p-2 justify-center">
   {icon ? (
    <img className="h-10 w-10 mr-4 rounded-full" src={icon} alt="" />
   ) : (
    <img
     className="h-10 w-10 mr-4 rounded-full"
     src="media/551e4f2f90796a073d9beb69ac2daa48.jpg"
     alt="Default Image"
    />
   )}
   <div className="inner-card text-center p-2">
    <p className="font-semibold">{AccountAmount} руб</p>
    <p>{AccountTitle}</p>
   </div>
  </div>
 );
};

export default AmountCard;
