import React, { FC } from 'react';
import check from '../../../assets/svgs/check.min.svg';
export const Settings: FC = () => {
   return (
      <div className="flex flex-col items-center justify-center flex-1">
         <div className="fixed top-0 left-0 right-0 flex items-center justify-center w-screen h-16 mt-20 text-center bg-opacity-50 bg-black-mimi">
            <h1 className="text-3xl text-white-mimi font-primary">
               Configuración
            </h1>
         </div>

         <div className="flex flex-col w-screen p-5 mt-48 bg-opacity-50 bg-black-mimi">
            <div className="flex flex-row justify-between">
               <p className="text-2xl text-white-mimi font-secondary">Plan:</p>
               <p className="text-2xl font-semibold text-green-mimi font-secondary">
                  Ilimitado
               </p>
            </div>
            <div className="flex flex-row justify-between mt-6">
               <p className="text-2xl text-white-mimi font-secondary">
                  Invita a un amigo
               </p>
            </div>
            <div className="flex flex-row justify-between mt-6">
               <p className="text-2xl text-white-mimi font-secondary">
                  Newsletter
               </p>
               <img src={check} alt="Check svg" />
            </div>
         </div>
         <div className="flex flex-col items-center justify-center md:flex-row">
            <button className="w-40 px-6 py-1 mx-2 mt-20 font-semibold tracking-wider uppercase rounded shadow text-white-mimi font-primary bg-green-mimi focus:outline-none focus:underline">
               Cambiar Plan
            </button>
            <button className="w-40 px-6 py-1 mx-2 mt-6 font-semibold tracking-wider uppercase bg-red-500 rounded shadow text-white-mimi md:mt-20 font-primary focus:outline-none focus:underline">
               Cancelar Cuenta
            </button>
         </div>
      </div>
   );
};
