import React, { FC } from 'react';
import error from '../assets/svgs/error.min.svg';

const Error: FC = () => {
   return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-opacity-50 bg-black-mimi">
         <img className="-mt-56" src={error} alt="Upss Error" />
      </div>
   );
};

export default Error;
