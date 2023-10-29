const AmountCard = ({ AccountTitle, AccountAmount, icon, imageBg }: any) => {
 return (
  <div
   className="mr-2 mb-3 border-solid border-y border-x drop-shadow-lg rounded-md w-52 h-16 center m-1 flex items-center p-2 justify-center"
   style={{ backgroundImage: `url(${imageBg || "media/Green-Gradient-Background-Graphics-1.jpg"})`,
   backgroundSize: 'cover', }}
  >
      {icon && (
        <img className="h-10 w-10 mr-4 rounded-full" src={icon} alt="" />
      )}
   <div className="inner-card text-center p-2">
    <p className="font-semibold">{AccountAmount} руб</p>
    <p>{AccountTitle}</p>
   </div>
  </div>
 );
};

export default AmountCard;
