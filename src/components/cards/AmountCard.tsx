// import React from 'react';

const AmountCard = ({ ...props }: any) => {

    return (
        <div className='mr-2 mb-3 border-solid border-y border-x drop-shadow-lg rounded-md w-52 h-16 center m-1 flex items-center p-2 justify-center'>
            {props.icon ? (
                <img className="h-10 w-10 mr-4 rounded-full" src={props.icon} alt="" />
            ) : (
                <img
                    className="h-10 w-10 mr-4 rounded-full"
                    src="media/551e4f2f90796a073d9beb69ac2daa48.jpg"
                    alt="Default Image"
                />
            )}
            <div className="inner-card text-center p-2">
                <p className=" font-semibold">{props.money} руб</p>
                <p>{props.title}</p>
            </div>
        </div>
    );
};

export default AmountCard