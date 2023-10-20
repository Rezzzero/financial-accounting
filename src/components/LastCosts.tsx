import React from 'react';

const LastCosts = ({costs} : any) => {
    return (
        <div>
            <div className="line-costs bg-slate-600">
                <p>{costs}</p>
            </div>
        </div>
    );
};

export default LastCosts;