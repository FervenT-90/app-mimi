import React, { FC } from 'react';
import avatar from '../../../assets/images/avatar.png';
import { useIdentityContext } from 'react-netlify-identity';

export const Profile: FC = () => {
   const identity = useIdentityContext();
   const isLoggedIn = identity && identity.isLoggedIn;
   const user = identity && identity.user;
   const name = user && user.user_metadata && user.user_metadata.full_name;
   const email = user && user.email;
   return (
      <div className="flex flex-col items-center justify-center flex-1">
         <div className="flex flex-col items-center justify-center w-screen h-full p-4 bg-opacity-50 bg-black-mimi">
            <div className="flex justify-start w-40 h-40 align-top">
               <img className="mt-1" src={avatar} alt="" />
            </div>

            <div className="flex flex-col justify-center">
               <h3 className="mt-6 text-4xl text-center text-white font-primary">
                  {name}
               </h3>
               <p className="mt-2 text-center text-white font-secondary">
                  {email}
               </p>
            </div>
         </div>
         <div>
            <h1 className="mt-12 text-2xl text-center text-white text-mimi-shadow font-primary">
               Unlimited Plan
            </h1>
            <h3 className="mt-6 text-2xl text-center text-white text-mimi-shadow font-primary">
               Entrenamientos/mes
            </h3>
            <p className="mt-2 text-xl text-center text-mimi-shadow text-green-mimi font-primary">
               12
            </p>
         </div>
         {/* <button className="px-6 py-1 mt-24 font-semibold tracking-wider text-white uppercase rounded shadow bg-green-mimi focus:outline-none focus:underline">
            Editar Perfil
         </button> */}
      </div>
   );
};
