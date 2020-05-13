import React from 'react';
import { navigate } from 'gatsby';
// eslint-disable-next-line import/no-unresolved
import { useIdentityContext } from 'react-netlify-identity';

// eslint-disable-next-line react/prop-types
const RouteLogin = ({ showLogin }) => {
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

export default RouteLogin;
