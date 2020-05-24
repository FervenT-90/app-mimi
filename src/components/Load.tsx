import React, { FC } from 'react';
import mimiLogo from '../assets/svgs/mimiLogo.svg';
const Load: FC = () => {
   return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-opacity-75 bg-black-mimi">
         <img className="pb-12 spin-animation" src={mimiLogo} alt="" />
         <div>
            <h1 className="mb-48 text-2xl text-white font-primary">
               Loading<span className="blink">.</span>
               <span className="blink">.</span>
               <span className="blink">.</span>
            </h1>
         </div>
      </div>
   );
};

export default Load;
