import React, { FC } from 'react';

export const Settings: FC = () => {
   return (
      <div className="flex flex-col items-center justify-center flex-1">
         <div className="fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-16 mt-20 text-center bg-opacity-75 bg-black-mimi">
            <h1 className="text-3xl text-white font-primary">Configuración</h1>
         </div>

         <div className="flex flex-col w-screen p-5 mt-24 bg-opacity-75 bg-black-mimi">
            <div className="flex flex-row justify-between">
               <p className="text-2xl text-white font-secondary">Plan:</p>
               <p className="text-2xl font-semibold text-green-mimi font-secondary">
                  Unlimited
               </p>
            </div>
            <div className="flex flex-row justify-between mt-6">
               <p className="text-2xl text-white font-secondary">
                  Darse de baja
               </p>
            </div>
            <div className="flex flex-row justify-between mt-6">
               <p className="text-2xl text-white font-secondary">
                  Invita a un amigo
               </p>
            </div>
            <div className="flex flex-row justify-between mt-6">
               <p className="text-2xl text-white font-secondary">Newsletter</p>
            </div>
         </div>
         <div className="flex items-center justify-center">
            <button className="w-40 px-6 py-1 mt-20 font-semibold tracking-wider text-white uppercase rounded shadow font-primary bg-green-mimi focus:outline-none focus:underline">
               Upgrade
            </button>
         </div>
      </div>
   );
};
