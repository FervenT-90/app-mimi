import React, { FC } from 'react';
import { navigate } from 'gatsby';
import { useIdentityContext } from 'react-netlify-identity';
import loginApp from '../../../assets/svgs/loginApp.min.svg';
interface Props {
   path: string;
   showLogin: () => void;
}

export const Login: FC<Props> = ({ showLogin }) => {
   const identity = useIdentityContext();
   if (identity && identity.isLoggedIn) {
      navigate('/dashboard/join', { replace: true });
   }
   return (
      <div className="flex flex-col items-center justify-center flex-1">
         <img src={loginApp} alt="Login App Image" />
         <p className="my-6 text-2xl text-center text-white text-mimi-shadow font-primary">
            Empieza a formar parte de nuestro equipo
         </p>
         <button
            className="px-6 py-1 font-semibold tracking-wider text-white uppercase rounded shadow bg-green-mimi focus:outline-none focus:underline"
            onClick={showLogin}
         >
            Log In
         </button>
      </div>
   );
};
