import React, { FC } from 'react';
import { navigate } from 'gatsby';
import { useIdentityContext } from 'react-netlify-identity';

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
      <div className="flex items-center justify-center flex-1">
         <p>Login or Sign Up</p>
         <button className="bg-green-500" onClick={showLogin}>
            Log In
         </button>
      </div>
   );
};
